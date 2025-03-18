const TABLE_NAME = "Users_dev";

export const UserTable = {
  TableName: TABLE_NAME,
  KeySchema: [
    { AttributeName: "email", KeyType: "HASH" }, // Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "email", AttributeType: "S" },
    { AttributeName: "phoneNumber", AttributeType: "S" },
    { AttributeName: "role", AttributeType: "S" },
    { AttributeName: "currentLocation", AttributeType: "S" },
    { AttributeName: "willingToRelocate", AttributeType: "S" },
    { AttributeName: "visaStatus", AttributeType: "S" },
    { AttributeName: "jobTitle", AttributeType: "S" },
    { AttributeName: "jobDomain", AttributeType: "S" },
    { AttributeName: "profile", AttributeType: "M" },
    { AttributeName: "bio", AttributeType: "S" },
    { AttributeName: "skills", AttributeType: "SS" }, // Set of strings
    { AttributeName: "resume", AttributeType: "S" },
    { AttributeName: "resumeOriginalName", AttributeType: "S" },
    { AttributeName: "company", AttributeType: "S" }, // Assuming ObjectId as String
    { AttributeName: "profilePhoto", AttributeType: "S" },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "RoleIndex",
      KeySchema: [
        { AttributeName: "role", KeyType: "HASH" },
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    },
    {
      IndexName: "PhoneNumberIndex",  // Secondary index for phoneNumber uniqueness
      KeySchema: [
        { AttributeName: "phoneNumber", KeyType: "HASH" },
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  // Add any additional configurations or provisioned throughput as needed
};
