import dotenv from 'dotenv';
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from '@aws-sdk/client-dynamodb';
// Load environment variables
dotenv.config();

// AWS Configuration from environment variables
const awsConfig = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
};
/**
 * Simplified Migration Script for Adding View Tracking to Existing Tables
 *
 * This script adds:
 * 1. A "remainingViews" field to each company
 * 2. A "viewedStudents" array to each user who needs to view student profiles
 *
 * Run this script with Node.js:
 * $ node simplified-migration.js
 */
// Create DynamoDB Document client
const dynamoDB = DynamoDBDocument.from(new DynamoDB(awsConfig));

// Main migration function
async function runMigration() {
  console.log("Starting simplified migration for view tracking...");

  try {
    // Step 1: Update companies with the remainingViews field
    console.log("Updating companies with remainingViews field...");

    const companiesResult = await dynamoDB.scan({
      TableName: "Companies_dev",
    });

    const companies = companiesResult.Items || [];
    console.log(`Found ${companies.length} companies to update.`);

    // Default number of views to add to each company
    const DEFAULT_VIEWS = 5; // Set to 5 as per your requirement

    // Update each company
    for (const company of companies) {
      // Skip if company already has remainingViews field
      if (company.remainingViews !== undefined) {
        console.log(`Company ${company.companyId || company.CompanyName} already has remainingViews, skipping.`);
        continue;
      }

      try {
        const updateParams = {
          TableName: "Companies_dev",
          Key: {
            companyId: company.companyId
          },
          UpdateExpression: "SET remainingViews = :views",
          ExpressionAttributeValues: {
            ":views": DEFAULT_VIEWS
          },
          ReturnValues: "UPDATED_NEW"
        };

        const result = await dynamoDB.update(updateParams);
        console.log(`Updated company ${company.companyId || company.CompanyName} with ${DEFAULT_VIEWS} views.`);
      } catch (error) {
        console.error(`Error updating company ${company.companyId || company.CompanyName}:`, error);
      }
    }

    // Step 2: Initialize viewedStudents array for users who need to view student profiles
    // Typically these would be users with the "employer" or "recruiter" role
    console.log("Initializing viewedStudents array for relevant users...");

    // Get all users with relevant roles
    // Update this query based on your application's role structure
    const usersResult = await dynamoDB.scan({
      TableName: "Users_dev",
      FilterExpression: "role = :employerRole OR role = :recruiterRole",
      ExpressionAttributeValues: {
        ":employerRole": "employer",
        ":recruiterRole": "recruiter"
      }
    });

    const users = usersResult.Items || [];
    console.log(`Found ${users.length} users to update.`);

    // Initialize empty viewedStudents array for each user if it doesn't exist
    for (const user of users) {
      // Skip if user already has viewedStudents field
      if (user.viewedStudents !== undefined) {
        console.log(`User ${user.email} already has viewedStudents, skipping.`);
        continue;
      }

      try {
        const updateParams = {
          TableName: "Users_dev",
          Key: {
            email: user.email
          },
          UpdateExpression: "SET viewedStudents = :emptyArray",
          ExpressionAttributeValues: {
            ":emptyArray": []
          },
          ReturnValues: "UPDATED_NEW"
        };

        const result = await dynamoDB.update(updateParams);
        console.log(`Initialized viewedStudents array for user ${user.email}.`);
      } catch (error) {
        console.error(`Error updating user ${user.email}:`, error);
      }
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
}

// Run the migration
runMigration().then(() => {
  console.log("Migration process finished.");
});

// async function updateAllItems() {
//     try {
//         // Validate environment variables
//         if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
//             throw new Error('Missing required AWS credentials in environment variables');
//         }

//         // Initialize DynamoDB client
//         const dynamodb = DynamoDBDocument.from(new DynamoDB(awsConfig));

//         console.log('Starting to scan items...');
//         const scanParams = {
//             TableName: 'Jobs'
//         };

//         const scanResult = await dynamodb.scan(scanParams);
//         console.log(`Found ${scanResult.Items.length} items to update`);

//         let successCount = 0;
//         for (const item of scanResult.Items) {
//             try {
//                 const updateParams = {
//                     TableName: 'Jobs',
//                     Key: {
//                         jobId: item.jobId
//                     },
//                     UpdateExpression: 'SET hiringTeam = :emptyTeam',
//                     ExpressionAttributeValues: {
//                         ':emptyTeam': '[]'
//                     }
//                 };

//                 await dynamodb.update(updateParams);
//                 successCount++;
//                 console.log(`Updated item with jobId: ${item.jobId} (${successCount}/${scanResult.Items.length})`);
//             } catch (updateError) {
//                 console.error(`Failed to update item ${item.jobId}:`, updateError);
//             }
//         }

//         console.log(`Update completed. Successfully updated ${successCount} items`);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// updateAllItems();

/**
 * Script to Update All Users with viewedStudents Array
 *
 * This script avoids using 'role' as a filter since it's a reserved keyword
 * and instead scans all users and adds the viewedStudents array to everyone.
 *
 * Run with: node update-all-users.js
 */

// import { DynamoDB } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Create DynamoDB client
// const client = new DynamoDB({
//   region: process.env.AWS_REGION || "us-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// const dynamoDB = DynamoDBDocument.from(client);

// // Update a user with viewedStudents array
// async function updateUser(user) {
//   try {
//     // Check if user already has viewedStudents
//     if (user.viewedStudents !== undefined) {
//       console.log(`User ${user.email} already has viewedStudents array, skipping.`);
//       return { success: true, skipped: true };
//     }

//     // Update user with empty viewedStudents array
//     const updateParams = {
//       TableName: "Users_dev",
//       Key: {
//         email: user.email
//       },
//       UpdateExpression: "SET viewedStudents = :emptyArray",
//       ExpressionAttributeValues: {
//         ":emptyArray": []
//       },
//       ReturnValues: "UPDATED_NEW"
//     };

//     const updateResult = await dynamoDB.update(updateParams);
//     console.log(`Successfully initialized viewedStudents array for user ${user.email}`);
//     return { success: true, skipped: false };
//   } catch (error) {
//     console.error(`Error updating user ${user.email}:`, error);
//     return { success: false, error: error.message };
//   }
// }

// // Main function
// async function main() {
//   console.log("Starting user update script...");

//   try {
//     // Test DynamoDB connection
//     console.log("Testing DynamoDB connection...");
//     const listResult = await client.listTables({});
//     console.log("Connection successful! Available tables:", listResult.TableNames);

//     // Get all users without using role as a filter
//     console.log("Fetching all users...");
//     const scanResult = await dynamoDB.scan({
//       TableName: "Users_dev"
//     });

//     const users = scanResult.Items || [];
//     console.log(`Found ${users.length} users in total.`);

//     // Counters for tracking progress
//     let successCount = 0;
//     let skipCount = 0;
//     let errorCount = 0;

//     // Process each user
//     for (let i = 0; i < users.length; i++) {
//       const user = users[i];
//       console.log(`Processing user ${i+1}/${users.length}: ${user.email}`);

//       const result = await updateUser(user);

//       if (result.success) {
//         if (result.skipped) {
//           skipCount++;
//         } else {
//           successCount++;
//         }
//       } else {
//         errorCount++;
//       }
//     }

//     console.log("\nUpdate completed!");
//     console.log(`Summary:`);
//     console.log(`- Total users processed: ${users.length}`);
//     console.log(`- Successfully updated: ${successCount}`);
//     console.log(`- Already had viewedStudents (skipped): ${skipCount}`);
//     console.log(`- Errors: ${errorCount}`);

//   } catch (error) {
//     console.error("Script execution failed:", error);
//   }
// }

// // Run the main function
// main().then(() => {
//   console.log("Script execution finished.");
// });


// /**
//  * Script to Create UserIdIndex for Companies Table
//  *
//  * This script creates a Global Secondary Index (GSI) on the userId field
//  * of the Companies_dev table to enable efficient lookups by userId.
//  *
//  * Run with: node create-userId-index.js
//  */

// import { DynamoDB } from "@aws-sdk/client-dynamodb";
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Create DynamoDB client
// const client = new DynamoDB({
//   region: process.env.AWS_REGION || "us-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// async function createUserIdIndex() {
//   console.log("Creating UserIdIndex for Companies_dev table...");

//   try {
//     // Check if the index already exists
//     const tableDescription = await client.describeTable({
//       TableName: "Companies_dev"
//     });

//     const existingIndexes = tableDescription.Table.GlobalSecondaryIndexes || [];
//     const indexExists = existingIndexes.some(index => index.IndexName === "UserIdIndex");

//     if (indexExists) {
//       console.log("UserIdIndex already exists. Skipping creation.");
//       return;
//     }

//     // Create the index
//     const updateTableParams = {
//       TableName: "Companies_dev",
//       AttributeDefinitions: [
//         {
//           AttributeName: "userId",
//           AttributeType: "S"
//         }
//       ],
//       GlobalSecondaryIndexUpdates: [
//         {
//           Create: {
//             IndexName: "UserIdIndex",
//             KeySchema: [
//               {
//                 AttributeName: "userId",
//                 KeyType: "HASH"
//               }
//             ],
//             Projection: {
//               ProjectionType: "ALL"
//             },
//             ProvisionedThroughput: {
//               ReadCapacityUnits: 5,
//               WriteCapacityUnits: 5
//             }
//           }
//         }
//       ]
//     };

//     await client.updateTable(updateTableParams);
//     console.log("UserIdIndex created successfully!");

//   } catch (error) {
//     // If the error is because the attribute definition already exists, we can ignore it
//     if (error.name === "ValidationException" &&
//         error.message.includes("AttributeDefinition")) {
//       console.log("Attribute definition for userId already exists. Proceeding with index creation.");

//       // Try again without the attribute definition
//       try {
//         const updateTableParams = {
//           TableName: "Companies_dev",
//           GlobalSecondaryIndexUpdates: [
//             {
//               Create: {
//                 IndexName: "UserIdIndex",
//                 KeySchema: [
//                   {
//                     AttributeName: "userId",
//                     KeyType: "HASH"
//                   }
//                 ],
//                 Projection: {
//                   ProjectionType: "ALL"
//                 },
//                 ProvisionedThroughput: {
//                   ReadCapacityUnits: 5,
//                   WriteCapacityUnits: 5
//                 }
//               }
//             }
//           ]
//         };

//         await client.updateTable(updateTableParams);
//         console.log("UserIdIndex created successfully on retry!");
//       } catch (retryError) {
//         console.error("Error creating index on retry:", retryError);
//       }
//     } else {
//       console.error("Error creating UserIdIndex:", error);
//     }
//   }
// }

// // Run the function
// createUserIdIndex().then(() => {
//   console.log("Script execution completed.");
// });