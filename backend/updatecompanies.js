// for updating userids array in company

import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const client = new DynamoDB({ region: "us-east-1" });
const dynamoDB = DynamoDBDocument.from(client);

const updateExistingCompanies = async () => {
  // Scan all companies from the table
  const { Items } = await dynamoDB.scan({ TableName: "Companies" });

  console.log(`Found ${Items.length} companies to process`);

  let updatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // Process each company
  for (const company of Items) {
    try {
      if (company.userId) {
        // Check if userIds already exists
        if (!company.userIds) {
          // Create new userIds array with the userId value while keeping userId field
          await dynamoDB.update({
            TableName: "Companies",
            Key: { companyId: company.companyId },
            UpdateExpression: "SET userIds = :users",
            ExpressionAttributeValues: { ":users": [company.userId] },
          });
          console.log(`Updated company: ${company.companyId} - Added userIds array with userId: ${company.userId} while preserving userId field`);
          updatedCount++;
        } else {
          // If userIds exists, make sure the userId is in the array
          if (!company.userIds.includes(company.userId)) {
            await dynamoDB.update({
              TableName: "Companies",
              Key: { companyId: company.companyId },
              UpdateExpression: "SET userIds = list_append(userIds, :newUser)",
              ExpressionAttributeValues: { ":newUser": [company.userId] },
            });
            console.log(`Updated company: ${company.companyId} - Added userId: ${company.userId} to existing userIds array`);
            updatedCount++;
          } else {
            console.log(`Skipped company: ${company.companyId} - userId already in userIds array`);
            skippedCount++;
          }
        }
      } else {
        // No userId to migrate
        console.log(`Skipped company: ${company.companyId} - No userId field found`);
        skippedCount++;
      }
    } catch (error) {
      console.error(`Error updating company ${company.companyId}:`, error);
      errorCount++;
    }
  }

  console.log("Migration summary:");
  console.log(`- Updated: ${updatedCount} companies`);
  console.log(`- Skipped: ${skippedCount} companies`);
  console.log(`- Errors: ${errorCount} companies`);
  console.log("Updated all companies to use userIds array while preserving userId field");
};

// Run the migration function
updateExistingCompanies()
  .then(() => console.log("Migration completed"))
  .catch(err => console.error("Migration failed:", err));






// const migrateJobData = async () => {
//     const jobs = await dynamoDB.scan({ TableName: "Jobs_dev" });

//     for (const job of jobs.Items) {
//       let updateNeeded = false;
//       let updateParams = {
//         TableName: "Jobs_dev",
//         Key: { jobId: job.jobId },
//         UpdateExpression: "SET ",
//         ExpressionAttributeValues: {},
//       };

//       if (typeof job.applications === "string") {
//         updateNeeded = true;
//         updateParams.UpdateExpression += "applications = :apps, ";
//         updateParams.ExpressionAttributeValues[":apps"] = job.applications
//           ? job.applications.split(",")
//           : [];
//       }

//       if (typeof job.hiringTeam === "string") {
//         updateNeeded = true;
//         updateParams.UpdateExpression += "hiringTeam = :team, ";
//         updateParams.ExpressionAttributeValues[":team"] = job.hiringTeam
//           ? job.hiringTeam.split(",")
//           : [];
//       }

//       // Remove trailing comma and space
//       if (updateNeeded) {
//         updateParams.UpdateExpression = updateParams.UpdateExpression.slice(0, -2);

//         await dynamoDB.update(updateParams);
//         console.log(`Updated job ${job.jobId}`);
//       }
//     }
//   };

//   migrateJobData();

