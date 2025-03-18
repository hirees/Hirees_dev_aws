// import { DynamoDB } from "@aws-sdk/client-dynamodb";
// import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

// // Initialize DynamoDB client
// const client = new DynamoDB({
//   region: process.env.AWS_REGION || "us-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// // Create DynamoDB Document client to use higher-level operations
// export const dynamoDB = DynamoDBDocument.from(client);

// // // Define the "Companies_dev" table model
// // export const CompanyTable = {
// //   TableName: "Companies_dev",
// //   KeySchema: [
// //     { AttributeName: "companyId", KeyType: "HASH" }, // Partition key
// //   ],
// //   AttributeDefinitions: [
// //     { AttributeName: "companyId", AttributeType: "S" }, // String
// //     { AttributeName: "userId", AttributeType: "S" },    // String
// //     { AttributeName: "CompanyName", AttributeType: "S" }, // String
// //   ],
// //   ProvisionedThroughput: {
// //     ReadCapacityUnits: 5,
// //     WriteCapacityUnits: 5,
// //   },
// //   GlobalSecondaryIndexes: [
// //     {
// //       IndexName: "UserIndex",
// //       KeySchema: [
// //         { AttributeName: "userId", KeyType: "HASH" }, // Partition key for UserIndex
// //       ],
// //       Projection: {
// //         ProjectionType: "ALL", // Include all attributes in the index
// //       },
// //       ProvisionedThroughput: {
// //         ReadCapacityUnits: 5,
// //         WriteCapacityUnits: 5,
// //       },
// //     },
// //     {
// //       IndexName: "NameIndex",
// //       KeySchema: [
// //         { AttributeName: "CompanyName", KeyType: "HASH" }, // Partition key for NameIndex
// //       ],
// //       Projection: {
// //         ProjectionType: "ALL", // Include all attributes in the index
// //       },
// //       ProvisionedThroughput: {
// //         ReadCapacityUnits: 5,
// //         WriteCapacityUnits: 5,
// //       },
// //     },
// //   ],
// // };
// export const CompanyTable = {
//   TableName: "Companies_dev",
//   KeySchema: [
//     { AttributeName: "companyId", KeyType: "HASH" }, // Primary Key
//   ],
//   AttributeDefinitions: [
//     { AttributeName: "companyId", AttributeType: "S" }, // String
//     { AttributeName: "CompanyName", AttributeType: "S" }, // String
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
//   GlobalSecondaryIndexes: [
//     {
//       IndexName: "NameIndex",
//       KeySchema: [
//         { AttributeName: "CompanyName", KeyType: "HASH" }, // Partition key
//       ],
//       Projection: {
//         ProjectionType: "ALL",
//       },
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//       },
//     },
//   ],
// };


// // Helper function to create the table if it doesn't exist
// export const createCompanyTable = async () => {
//   try {
//     await client.createTable(CompanyTable);

//   } catch (error) {
//     if (error.name === "ResourceInUseException") {

//     } else {
//       console.error("Error creating Companies table:", error);
//       throw error;
//     }
//   }
// };

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB client
const client = new DynamoDB({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Create DynamoDB Document client to use higher-level operations
export const dynamoDB = DynamoDBDocument.from(client);

// Updated Companies table definition with Views field
export const CompanyTable = {
  TableName: "Companies_dev",
  KeySchema: [
    { AttributeName: "companyId", KeyType: "HASH" }, // Primary Key
  ],
  AttributeDefinitions: [
    { AttributeName: "companyId", AttributeType: "S" }, // String
    { AttributeName: "CompanyName", AttributeType: "S" }, // String
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
  GlobalSecondaryIndexes: [
    {
      IndexName: "NameIndex",
      KeySchema: [
        { AttributeName: "CompanyName", KeyType: "HASH" }, // Partition key
      ],
      Projection: {
        ProjectionType: "ALL",
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    },
  ],
};

// Helper function to create the Companies table if it doesn't exist
export const createCompanyTable = async () => {
  try {
    await client.createTable(CompanyTable);
  } catch (error) {
    if (error.name === "ResourceInUseException") {
      // Table already exists, no action needed
    } else {
      console.error("Error creating Companies table:", error);
      throw error;
    }
  }
};
