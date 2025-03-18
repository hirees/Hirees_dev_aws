// export const JobTable = {
//   TableName: "Jobs_dev",
//   KeySchema: [
//     { AttributeName: "jobId", KeyType: "HASH" }, // Partition key
//   ],
//   AttributeDefinitions: [
//     { AttributeName: "jobId", AttributeType: "S" },
//     { AttributeName: "created_by", AttributeType: "S" },
//     { AttributeName: "companyId", AttributeType: "S" },
//     { AttributeName: "title", AttributeType: "S" },
//     { AttributeName: "description", AttributeType: "S" },
//     { AttributeName: "requirements", AttributeType: "S" }, // We'll store this as a comma-separated string or JSON array
//     { AttributeName: "salary", AttributeType: "S" },
//     { AttributeName: "experience", AttributeType: "S" },
//     { AttributeName: "location", AttributeType: "S" },
//     { AttributeName: "jobType", AttributeType: "S" }, // We'll store job types as a string
//     { AttributeName: "applications", AttributeType: "S" }, // You can store this as a JSON array or string representation of ObjectIds
//   ],
//   GlobalSecondaryIndexes: [
//     {
//       IndexName: "CreatedByIndex",
//       KeySchema: [{ AttributeName: "created_by", KeyType: "HASH" }],
//       Projection: {
//         ProjectionType: "ALL",
//       },
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//       },
//     },
//     {
//       IndexName: "CompanyIndex",
//       KeySchema: [{ AttributeName: "companyId", KeyType: "HASH" }],
//       Projection: {
//         ProjectionType: "ALL",
//       },
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//       },
//     },
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
// // };
// export const JobTable = {
//   TableName: "Jobs_dev",
//   KeySchema: [
//     { AttributeName: "jobId", KeyType: "HASH" }, // Partition key
//   ],
//   AttributeDefinitions: [
//     { AttributeName: "jobId", AttributeType: "S" },
//     { AttributeName: "created_by", AttributeType: "S" },
//     { AttributeName: "companyId", AttributeType: "S" },
//     { AttributeName: "title", AttributeType: "S" },
//     { AttributeName: "description", AttributeType: "S" },
//     { AttributeName: "requirements", AttributeType: "S" }, // We'll store this as a comma-separated string or JSON array
//     { AttributeName: "salary", AttributeType: "S" },
//     { AttributeName: "experience", AttributeType: "S" },
//     { AttributeName: "location", AttributeType: "S" },
//     { AttributeName: "jobType", AttributeType: "S" }, // We'll store job types as a string
//     { AttributeName: "applications", AttributeType: "S" }, // You can store this as a JSON array or string representation of ObjectIds
//     { AttributeName: "hiringTeam", AttributeType: "S" }, // New field for hiring team as JSON array string
//   ],
//   GlobalSecondaryIndexes: [
//     {
//       IndexName: "CreatedByIndex",
//       KeySchema: [{ AttributeName: "created_by", KeyType: "HASH" }],
//       Projection: {
//         ProjectionType: "ALL",
//       },
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//       },
//     },
//     {
//       IndexName: "CompanyIndex",
//       KeySchema: [{ AttributeName: "companyId", KeyType: "HASH" }],
//       Projection: {
//         ProjectionType: "ALL",
//       },
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//       },
//     },
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
// };

export const JobTable = {
  TableName: "Jobs_dev",
  KeySchema: [{ AttributeName: "jobId", KeyType: "HASH" }], // Primary Key

  AttributeDefinitions: [
    { AttributeName: "jobId", AttributeType: "S" },
    { AttributeName: "created_by", AttributeType: "S" },
    { AttributeName: "companyId", AttributeType: "S" },
  ],

  GlobalSecondaryIndexes: [
    {
      IndexName: "CreatedByIndex",
      KeySchema: [{ AttributeName: "created_by", KeyType: "HASH" }],
      Projection: { ProjectionType: "ALL" },
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    },
    {
      IndexName: "CompanyIndex",
      KeySchema: [{ AttributeName: "companyId", KeyType: "HASH" }],
      Projection: { ProjectionType: "ALL" },
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    },
  ],

  ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
};
