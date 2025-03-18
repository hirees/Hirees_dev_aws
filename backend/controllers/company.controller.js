import { docClient, dynamoDB } from "../config/aws.config.js";
import getdataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { v4 as uuidv4 } from "uuid";
import { uploadToS3 } from "../utils/s3Utils.js"; // Adjust path as needed
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import nodemailer from "nodemailer";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import {
  DynamoDB,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "hireessupp@gmail.com",
    pass: process.env.EMAIL_APP_PASSWORD || "ctdw tvvn psqw haap",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
//register Compnay
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        error: "Company name is required",
        status: false,
      });
    }

    // Check if user already has a company
    const userCompaniesParams = {
      TableName: "Companies_dev",
      IndexName: "UserIndex",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": req.id,
      },
    };

    const userCompanies = await dynamoDB.query(userCompaniesParams);
    if (userCompanies.Items.length > 0) {
      return res.status(400).json({
        error: "User can only register one company",
        status: false,
      });
    }

    // Check if company name exists by scanning and filtering
    // This approach works when you need case-insensitive comparison
    const scanParams = {
      TableName: "Companies_dev",
      FilterExpression: "contains(#name_lower, :name_lower)",
      ExpressionAttributeNames: {
        "#name_lower": "name_lower",
      },
      ExpressionAttributeValues: {
        ":name_lower": companyName.toLowerCase(),
      },
    };

    const existingCompanies = await dynamoDB.scan(scanParams);

    if (existingCompanies.Items && existingCompanies.Items.length > 0) {
      return res.status(400).json({
        error: "Company already exists",
        status: false,
      });
    }

    // Create new company
    const companyId = uuidv4();
    const company = {
      companyId,
      CompanyName: companyName,
      name_lower: companyName.toLowerCase(), // For case-insensitive searches
      userId: req.id,
      description: "",
      website: "",
      location: "",
      logo: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await dynamoDB.put({
      TableName: "Companies_dev",
      Item: company,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      status: true,
      company,
    });
  } catch (err) {
    console.error("Company registration error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};
// export const registerCompany = async (req, res) => {
//   try {
//     const { companyName } = req.body;

//     if (!companyName) {
//       return res.status(400).json({
//         error: "Company name is required",
//         status: false,
//       });
//     }

//     // Check if user already has a company
//     const userCompaniesParams = {
//       TableName: "Companies_dev",
//       IndexName: "UserIndex",
//       KeyConditionExpression: "userId = :userId",
//       ExpressionAttributeValues: {
//         ":userId": req.id,
//       },
//     };

//     const userCompanies = await dynamoDB.query(userCompaniesParams);
//     if (userCompanies.Items.length > 0) {
//       return res.status(400).json({
//         error: "User can only register one company",
//         status: false,
//       });
//     }

//     // Check if company name exists (case insensitive)
//     const nameCheckParams = {
//       TableName: "Companies_dev",
//       IndexName: "NameIndex", // ✅ Specify the GSI name
//       KeyConditionExpression: "CompanyName = :companyName",
//       ExpressionAttributeValues: {
//         ":companyName": "Amazon", // Replace with actual input
//       },
//     };

//     // const nameCheckParams = {
//     //   TableName: "Companies_dev",
//     //   IndexName: "NameIndex",
//     //   KeyConditionExpression: "CompanyName = :CompanyName",
//     //   ExpressionAttributeValues: {
//     //     ":CompanyName": companyName.toLowerCase(),
//     //   }
//     // };

//     const existingCompany = await dynamoDB.query(nameCheckParams);
//     // console.log(existingCompany);
//     const scanParams = { TableName: "Companies_dev" };
//     const result = await dynamoDB.scan(scanParams);
//     // console.log(result);

//     if (existingCompany.Items.length > 0) {
//       return res.status(400).json({
//         error: "Company already exists",
//         status: false,
//       });
//     }

//     // Create new company
//     const companyId = uuidv4();
//     const company = {
//       companyId,
//       CompanyName: companyName,
//       name_lower: companyName.toLowerCase(), // For case-insensitive searches
//       userId: req.id,
//       description: "",
//       website: "",
//       location: "",
//       logo: "",
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     await dynamoDB.put({
//       TableName: "Companies_dev",
//       Item: company,
//     });

//     return res.status(201).json({
//       message: "Company registered successfully",
//       status: true,
//       company,
//     });
//   } catch (err) {
//     console.error("Company registration error:", err);
//     return res.status(500).json({
//       error: "Internal server error",
//       details: err.message,
//     });
//   }
// };

//get company
export const getCompany = async (req, res) => {
  try {
    // Check if the UserIndex exists before attempting to use it
    let result;

    try {
      // Try using the GSI first (more efficient if it exists)
      const queryParams = {
        TableName: "Companies_dev",
        IndexName: "UserIndex",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": req.id,
        },
      };

      result = await dynamoDB.query(queryParams);

      // If no results from GSI query, try the scan method
      if (!result.Items || result.Items.length === 0) {
        const scanParams = {
          TableName: "Companies_dev",
          FilterExpression: "contains(userIds, :userId)",
          ExpressionAttributeValues: {
            ":userId": req.id,
          },
        };

        result = await dynamoDB.scan(scanParams);
      }
    } catch (indexError) {
      console.log(
        "UserIndex not available or other error:",
        indexError.message
      );

      // Fallback to scan with filter if index query fails
      const scanParams = {
        TableName: "Companies_dev",
        FilterExpression: "contains(userIds, :userId)",
        ExpressionAttributeValues: {
          ":userId": req.id,
        },
      };

      result = await dynamoDB.scan(scanParams);
    }

    // Handle case where no companies are found with either method
    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        error: "No companies found for this user",
        status: false,
      });
    }

    return res.status(200).json({
      status: true,
      companies: result.Items,
    });
  } catch (err) {
    console.error("Get companies error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};
// export const getCompany = async (req, res) => {
//   try {
//     const params = {
//       TableName: "Companies_dev",
//       FilterExpression: "contains(userIds, :userId)",
//       ExpressionAttributeValues: {
//         ":userId": req.id,
//       },
//     };

//     const result = await dynamoDB.scan(params);

//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         error: "No companies found for this user",
//         status: false,
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       companies: result.Items,
//     });
//   } catch (err) {
//     console.error("Get companies error:", err);
//     return res.status(500).json({
//       error: "Internal server error",
//       details: err.message,
//     });
//   }
// };
// export const getCompany = async (req, res) => {
//   try {
//     const params = {
//       TableName: "Companies_dev",
//       IndexName: "UserIndex",
//       KeyConditionExpression: "userId = :userId",
//       ExpressionAttributeValues: {
//         ":userId": req.id,
//       },
//     };

//     const result = await dynamoDB.query(params);

//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         error: "No companies found for this user",
//         status: false,
//       });
//     }

//     return res.status(200).json({
//       status: true,
//       companies: result.Items,
//     });
//   } catch (err) {
//     console.error("Get companies error:", err);
//     return res.status(500).json({
//       error: "Internal server error",
//       details: err.message,
//     });
//   }
// };

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id === "undefined") {
      return res.status(400).json({
        status: false,
        message: "Invalid company ID provided",
      });
    }

    const result = await dynamoDB.get({
      TableName: "Companies_dev",
      Key: {
        companyId: id,
      },
    });

    if (!result.Item) {
      return res.status(404).json({
        status: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      status: true,
      data: result.Item,
    });
  } catch (error) {
    console.error("Get Company By ID Error:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//update company

export const updateCompany = async (req, res) => {
  try {
    const { CompanyName, description, website, location } = req.body;
    const companyId = req.params.id;
    const file = req.file;

    // Get existing company
    try {
      const { Item: company } = await docClient.get({
        TableName: "Companies_dev",
        Key: {
          companyId: companyId,
        },
      });

      if (!company) {
        return res.status(404).json({
          error: "Company not found",
          status: false,
        });
      }

      // Check if user owns the company
      if (company.userId !== req.id) {
        return res.status(403).json({
          error: "Not authorized to update this company",
          status: false,
        });
      }

      // Handle file upload if present
      let s3Response;
      if (file) {
        try {
          s3Response = await uploadToS3(file, "companies");

          // Delete old logo if exists
          if (company.logo) {
            try {
              const oldKey = company.logo.split("/").slice(-2).join("/");
              const deleteCommand = new DeleteObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `companies/${oldKey}`,
              });
              await s3Client.send(deleteCommand);
            } catch (deleteError) {
              console.error("Error deleting old logo:", deleteError);
              // Continue with update even if delete fails
            }
          }
        } catch (uploadError) {
          return res.status(500).json({
            error: "Failed to upload new logo",
            details: uploadError.message,
            status: false,
          });
        }
      }

      // Prepare update expression
      let updateExpression = "SET updatedAt = :updatedAt";
      const expressionAttributeValues = {
        ":updatedAt": new Date().toISOString(),
      };
      const expressionAttributeNames = {};

      // Add fields that are being updated
      if (CompanyName) {
        updateExpression += ", CompanyName = :CompanyName";
        expressionAttributeValues[":CompanyName"] = CompanyName;
      }

      if (description) {
        updateExpression += ", description = :description";
        expressionAttributeValues[":description"] = description;
      }

      if (website) {
        updateExpression += ", website = :website";
        expressionAttributeValues[":website"] = website;
      }

      if (location) {
        updateExpression += ", #loc = :location";
        expressionAttributeNames["#loc"] = "location";
        expressionAttributeValues[":location"] = location;
      }

      if (s3Response && s3Response.url) {
        updateExpression += ", logo = :logo";
        expressionAttributeValues[":logo"] = s3Response.url;
      }

      // Update company
      const updateResult = await docClient.update({
        TableName: "Companies_dev",
        Key: {
          companyId: companyId,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ExpressionAttributeNames: expressionAttributeNames,
        ReturnValues: "ALL_NEW",
      });

      return res.status(200).json({
        message: "Company updated successfully",
        status: true,
        company: updateResult.Attributes,
      });
    } catch (dbError) {
      console.error("Database operation error:", dbError);
      return res.status(500).json({
        error: "Database operation failed",
        details: dbError.message,
        status: false,
      });
    }
  } catch (err) {
    console.error("Company update error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
      status: false,
    });
  }
};

export const getCompaniesWithJobInfo = async (req, res) => {
  try {
    const companyParams = {
      TableName: "Companies_dev",
      Select: "ALL_ATTRIBUTES",
    };

    const companiesResult = await dynamoDB.scan(companyParams);

    if (!companiesResult.Items?.length) {
      return res
        .status(404)
        .json({ status: false, message: "No companies found" });
    }

    const jobParams = {
      TableName: "Jobs_dev",
      IndexName: "CompanyIndex",
      KeyConditionExpression: "companyId = :companyId",
    };

    const companiesWithJobs = await Promise.all(
      companiesResult.Items.map(async (company) => {
        jobParams.ExpressionAttributeValues = {
          ":companyId": company.companyId,
        };
        const jobsResult = await dynamoDB.query(jobParams);
        return {
          ...company,
          jobCount: jobsResult.Items?.length || 0,
        };
      })
    );

    return res.status(200).json({ status: true, companies: companiesWithJobs });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

const client = new DynamoDB({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
// export const joinCompany = async (req, res) => {
//   const { companyId, userId } = req.body;

//   if (!companyId || !userId) {
//     return res.status(400).json({ message: "Company ID and User ID are required" });
//   }

//   const params = {
//     TableName: 'Companies_dev',
//     Key: marshall({ companyId }),
//     UpdateExpression: 'SET userIds = list_append(if_not_exists(userIds, :emptyList), :userId)',
//     ExpressionAttributeValues: marshall({
//       ':userId': [userId],
//       ':emptyList': []
//     }),
//     ReturnValues: 'UPDATED_NEW'
//   };

//   try {
//     const command = new UpdateItemCommand(params);
//     const result = await client.send(command);
//     console.log('Successfully joined company:', unmarshall(result.Attributes));
//     return res.status(200).json({
//       message: "Successfully joined company",
//       data: unmarshall(result.Attributes)
//     });
//   } catch (error) {
//     console.error('Error joining company:', error);
//     return res.status(500).json({ message: "Unable to join company" });
//   }
// };

// export const getAllCompanies = async (req, res) => {
//   try {
//     const params = {
//       TableName: "Companies_dev", // Your DynamoDB table name
//     };

//     // Using callback-based style (SDK v2)
//     dynamoDB.scan(params, (err, data) => {
//       if (err) {
//         console.error("Error fetching companies:", err);
//         return res.status(500).json({ error: "Unable to fetch companies." });
//       }

//       const companies = data.Items.map(company => ({
//         companyId: company.companyId,
//         companyName: company.CompanyName,
//       }));

//       res.status(200).json(companies);  // Send the list of companies
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Unable to fetch companies." });
//   }
// };

// companyController.js

// Generate OTP for company join requests
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const params = {
      TableName: "Companies_dev", // Your DynamoDB table name
    };

    // Using callback-based style (SDK v2)
    dynamoDB.scan(params, (err, data) => {
      if (err) {
        console.error("Error fetching companies:", err);
        return res.status(500).json({ error: "Unable to fetch companies." });
      }

      const companies = data.Items.map((company) => ({
        companyId: company.companyId,
        companyName: company.CompanyName,
        description: company.description || "",
        location: company.location || "",
        logo: company.logo || "",
      }));

      res.status(200).json(companies); // Send the list of companies
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Unable to fetch companies." });
  }
};

// Direct join company (original function)
export const joinCompany = async (req, res) => {
  const { companyId, userId } = req.body;

  if (!companyId || !userId) {
    return res
      .status(400)
      .json({ message: "Company ID and User ID are required" });
  }

  const params = {
    TableName: "Companies_dev",
    Key: marshall({ companyId }),
    UpdateExpression:
      "SET userIds = list_append(if_not_exists(userIds, :emptyList), :userId)",
    ExpressionAttributeValues: marshall({
      ":userId": [userId],
      ":emptyList": [],
    }),
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const command = new UpdateItemCommand(params);
    const result = await client.send(command);
    console.log("Successfully joined company:", unmarshall(result.Attributes));
    return res.status(200).json({
      message: "Successfully joined company",
      data: unmarshall(result.Attributes),
    });
  } catch (error) {
    console.error("Error joining company:", error);
    return res.status(500).json({ message: "Unable to join company" });
  }
};

// Request to join company - send OTP to admin
export const requestJoinCompany = async (req, res) => {
  try {
    const { companyId, userId } = req.body;

    if (!companyId || !userId) {
      return res.status(400).json({
        message: "Company ID and User ID are required",
      });
    }

    // Get company details
    const companyParams = {
      TableName: "Companies_dev",
      Key: marshall({ companyId }),
    };

    try {
      const command = new GetItemCommand(companyParams);
      const { Item } = await client.send(command);

      if (!Item) {
        return res.status(404).json({ message: "Company not found" });
      }

      const company = unmarshall(Item);

      // Check if user is already in the company
      const userIds = company.userIds || [];
      if (userIds.includes(userId)) {
        return res
          .status(400)
          .json({ message: "User is already a member of this company" });
      }

      // Get admin email (using the company creator's ID)
      const adminUserId = company.userId;

      // Generate verification code
      const verificationCode = generateVerificationCode();
      const expiryTime = Date.now() + 15 * 60 * 1000; // 15 minutes expiry

      // Store join request code in User table
      const updateUserParams = {
        TableName: "Users_dev", // Assuming your users table is named "Users_dev"
        Key: marshall({ email: userId }),
        UpdateExpression:
          "SET companyJoinCode = :code, companyJoinExpires = :expiry, companyJoinId = :companyId",
        ExpressionAttributeValues: marshall({
          ":code": verificationCode,
          ":expiry": expiryTime,
          ":companyId": companyId,
        }),
        ReturnValues: "NONE",
      };

      const updateCommand = new UpdateItemCommand(updateUserParams);
      await client.send(updateCommand);

      // Send verification code to admin
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminUserId,
        subject: `Company Join Request: ${company.CompanyName}`,
        html: `
          <h1>Company Join Request</h1>
          <p>User <strong>${userId}</strong> is requesting to join <strong>${company.CompanyName}</strong>.</p>
          <p>Use the following verification code to approve this request: <strong>${verificationCode}</strong></p>
          <p>This code will expire in 15 minutes.</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      // Mask admin email for privacy
      const maskedEmail =
        adminUserId.split("@")[0] +
        "@" +
        adminUserId.split("@")[1].charAt(0) +
        "***";

      res.status(200).json({
        message:
          "Join request sent successfully. Please ask an admin to provide the code.",
        adminEmail: maskedEmail,
      });
    } catch (error) {
      console.error("Error getting company details:", error);
      return res
        .status(500)
        .json({ message: "Unable to process join request" });
    }
  } catch (error) {
    console.error("Error processing join request:", error);
    res.status(500).json({ message: "Failed to process join request" });
  }
};

// Verify code and join company
export const verifyAndJoinCompany = async (req, res) => {
  try {
    const { companyId, userId, code } = req.body;

    if (!companyId || !userId || !code) {
      return res.status(400).json({
        message: "Company ID, User ID, and verification code are required",
      });
    }

    // Get user details
    const getUserParams = {
      TableName: "Users_dev",
      Key: marshall({ email: userId }),
    };

    try {
      const getUserCommand = new GetItemCommand(getUserParams);
      const { Item } = await client.send(getUserCommand);

      if (!Item) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = unmarshall(Item);
      const currentTime = Date.now();

      // Verify code and expiry
      if (
        user.companyJoinCode !== code ||
        user.companyJoinExpires < currentTime ||
        user.companyJoinId !== companyId
      ) {
        return res
          .status(400)
          .json({ message: "Invalid or expired verification code" });
      }

      // Use existing join company logic
      const params = {
        TableName: "Companies_dev",
        Key: marshall({ companyId }),
        UpdateExpression:
          "SET userIds = list_append(if_not_exists(userIds, :emptyList), :userId)",
        ExpressionAttributeValues: marshall({
          ":userId": [userId],
          ":emptyList": [],
        }),
        ReturnValues: "UPDATED_NEW",
      };

      const command = new UpdateItemCommand(params);
      const result = await client.send(command);

      // Clear join request data from user
      const updateUserParams = {
        TableName: "Users_dev",
        Key: marshall({ email: userId }),
        UpdateExpression:
          "REMOVE companyJoinCode, companyJoinExpires, companyJoinId",
        ReturnValues: "NONE",
      };

      const updateUserCommand = new UpdateItemCommand(updateUserParams);
      await client.send(updateUserCommand);

      console.log(
        "Successfully joined company:",
        unmarshall(result.Attributes)
      );
      return res.status(200).json({
        message: "Successfully joined company",
        data: unmarshall(result.Attributes),
      });
    } catch (error) {
      console.error("Error verifying join request:", error);
      return res
        .status(500)
        .json({ message: "Unable to process join request" });
    }
  } catch (error) {
    console.error("Error verifying join request:", error);
    res.status(500).json({ message: "Failed to process join request" });
  }
};
