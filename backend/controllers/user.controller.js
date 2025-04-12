import { dynamoDB } from "../config/aws.config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { uploadToS3 } from "../utils/s3Utils.js";
import nodemailer from "nodemailer";
const TABLE_NAME = "Users_dev";
import { docClient } from "../config/aws.config.js";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../config/s3Config.js";
import dotenv from "dotenv";
dotenv.config();

console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Password Loaded:", !!process.env.EMAIL_APP_PASSWORD);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD||"ctdw tvvn psqw haap",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Different email templates
const emailTemplates = {
  welcome: (fullname, role) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0;
        }
        .header {
          background-color: #1a365d;
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .content {
          background-color: #ffffff;
          padding: 40px 30px;
          border: 1px solid #e5e5e5;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666666;
          font-size: 14px;
        }
        h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        h2 {
          color: #1a365d;
          font-size: 20px;
          margin-top: 0;
        }
        ul {
          padding-left: 20px;
          margin: 15px 0;
        }
        li {
          margin-bottom: 10px;
          color: #333333;
        }
        p {
          margin: 15px 0;
          color: #333333;
        }
        .highlight {
          color: #1a365d;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Our Platform</h1>
        </div>
        <div class="content">
          <h2>Dear ${fullname},</h2>
          <p>Thank you for joining our professional community as a <span class="highlight">${role}</span>. We're delighted to have you on board.</p>
          ${
            role === "student"
              ? `<p>As a student member, you now have access to:</p>
            <ul>
              <li>Exclusive job opportunities aligned with your career goals</li>
              <li>Professional resume building and optimization tools</li>
              <li>Expert career guidance and industry insights</li>
              <li>Networking opportunities with industry professionals</li>
            </ul>`
              : `<p>As a ${role}, you now have full access to our platform's professional suite of tools and resources designed to enhance your experience.</p>`
          }
          <p>Should you have any questions or require assistance, our dedicated support team is here to help.</p>
          <p>Best regards,<br>The Platform Team</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Your Platform Name. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `,

  loginAlert: (fullname, loginTime, deviceInfo) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 0;
        }
        .header {
          background-color: #1a365d;
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .content {
          background-color: #ffffff;
          padding: 40px 30px;
          border: 1px solid #e5e5e5;
        }
        .footer {
          background-color: #f8f9fa;
          padding: 20px;
          text-align: center;
          color: #666666;
          font-size: 14px;
        }
        h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        h2 {
          color: #1a365d;
          font-size: 20px;
          margin-top: 0;
        }
        .info-box {
          background-color: #f8f9fa;
          border-left: 4px solid #1a365d;
          padding: 15px;
          margin: 20px 0;
        }
        .alert {
          color: #721c24;
          background-color: #f8d7da;
          border: 1px solid #f5c6cb;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info-label {
          font-weight: 600;
          color: #1a365d;
          display: inline-block;
          width: 100px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Security Alert</h1>
        </div>
        <div class="content">
          <h2>Dear ${fullname},</h2>
          <p>We detected a new login to your account. Please review the details below:</p>

          <div class="info-box">
            <p><span class="info-label">Time:</span> ${loginTime}</p>
            <p><span class="info-label">Device:</span> ${deviceInfo}</p>
          </div>

          <div class="alert">
            If you don't recognize this activity, please secure your account immediately by:
            <ul>
              <li>Changing your password</li>
              <li>Enabling two-factor authentication</li>
              <li>Contacting our support team</li>
            </ul>
          </div>

          <p>Best regards,<br>The Security Team</p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} Your Platform Name. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `,
};
// Send email function
const sendEmail = async (type, userEmail, data) => {
  try {
    let subject, html;

    switch (type) {
      case "welcome":
        subject = "Welcome to Our Platform!";
        html = emailTemplates.welcome(data.fullname, data.role);
        break;
      case "profileUpdate":
        subject = "Profile Update Confirmation";
        html = emailTemplates.profileUpdate(data.fullname);
        break;
      case "loginAlert":
        subject = "New Login Detected";
        html = emailTemplates.loginAlert(
          data.fullname,
          data.loginTime,
          data.deviceInfo
        );
        break;
    }

    const mailOptions = {
      from: `"Your Platform Name" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.error(`Failed to send ${type} email:`, error);
    return false;
  }
};
//register user
export const register = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phoneNumber,
      password,
      role,
      currentLocation,
      jobDomain,
      jobTitle,
    } = req.body;

    // Validate input fields
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        error: "All fields are required",
        status: false,
      });
    }

    // Additional validation for student-specific fields
    if (role === "student" && (!currentLocation || !jobTitle)) {
      return res.status(400).json({
        error: "All student-specific fields are required",
        status: false,
      });
    }

    // Check if resume file is uploaded for students
    if (role === "student" && !req.file) {
      return res.status(400).json({
        error: "Resume is required for registration",
        status: false,
      });
    }

    // Check if user already exists
    const existingUser = await dynamoDB.get({
      TableName: "Users_dev",
      Key: { email },
    });

    if (existingUser.Item) {
      return res.status(400).json({
        error: "User already exists",
        status: false,
      });
    }

    const file = req.file;
    let s3Response;

    if (file) {
      // Upload file to S3
      s3Response = await uploadToS3(file, "resume-files");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data
    const userData = {
      fullname,
      email,
      phoneNumber: phoneNumber.toString(),
      password: hashedPassword,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: {
        profilePhoto: null,
        profilePhotoKey: null,
        bio: "",
        skills: [],
        resume: s3Response ? s3Response.url : null,
        resumeKey: s3Response ? s3Response.key : null,
        resumeOriginalName: file ? file.originalname : "",
      },
    };

    // Add student-specific fields
    if (role === "student") {
      userData.profile = {
        ...userData.profile,
        currentLocation,
        jobTitle,
        jobDomain,
      };
    }

    // Save user to DynamoDB
    await dynamoDB.put({
      TableName: "Users_dev",
      Item: userData,
    });

    await sendEmail("welcome", email, { fullname, role });

    // Return success response
    return res.status(201).json({
      message: "User registered successfully",
      status: true,
      user: {
        fullname: userData.fullname,
        email: userData.email,
        role: userData.role,
        profile: userData.profile,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};
// export const register = async (req, res) => {
//   try {
//     const {
//       fullname,
//       email,
//       phoneNumber,
//       password,
//       role,
//       currentLocation,
//       jobDomain,
//       jobTitle,
//     } = req.body;

//     // Validate input fields
//     if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({
//         error: "All fields are required",
//         status: false,
//       });
//     }

//     // Additional validation for student-specific fields
//     if (role === "student" && (!currentLocation || !jobTitle)) {
//       return res.status(400).json({
//         error: "All student-specific fields are required",
//         status: false,
//       });
//     }

//     // Check if user already exists
//     const existingUser = await dynamoDB.get({
//       TableName: "Users_dev",
//       Key: { email },
//     });

//     if (existingUser.Item) {
//       return res.status(400).json({
//         error: "User already exists",
//         status: false,
//       });
//     }

//     const file = req.file;
//     let s3Response;

//     if (file) {
//       // If user already has a profile photo, delete it from S3
//       if (existingUser.Item?.profile?.profilePhotoKey) {
//         await deleteFromS3(existingUser.Item.profile.profilePhotoKey);
//       }
//       // Upload new profile photo to S3
//       s3Response = await uploadToS3(file, "profile-photos");
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Prepare user data
//     const userData = {
//       fullname,
//       email,
//       phoneNumber: phoneNumber.toString(),
//       password: hashedPassword,
//       role,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       profile: {
//         profilePhoto: s3Response ? s3Response.url : null,
//         profilePhotoKey: s3Response ? s3Response.key : null, // Store S3 key for future reference
//         bio: "",
//         skills: [],
//         resume: "",
//         resumeOriginalName: "",
//       },
//     };

//     // Add student-specific fields
//     if (role === "student") {
//       userData.profile = {
//         ...userData.profile,
//         currentLocation,
//         jobTitle,
//         jobDomain,
//       };
//     }

//     // Save user to DynamoDB
//     await dynamoDB.put({
//       TableName: "Users_dev",
//       Item: userData,
//     });

//     await sendEmail("welcome", email, { fullname, role });

//     // Return success response
//     return res.status(201).json({
//       message: "User registered successfully",
//       status: true,
//       user: {
//         fullname: userData.fullname,
//         email: userData.email,
//         role: userData.role,
//         profile: userData.profile,
//       },
//     });
//   } catch (err) {
//     console.error("Registration error:", err);
//     return res.status(500).json({
//       error: "Internal server error",
//       details: err.message,
//     });
//   }
// };

//update user
export const modifyProfile = async (req, res) => {
  try {
    const { email } = req.body; // Assuming email is the unique identifier
    const file = req.file;

    // Validate input
    if (!email) {
      return res.status(400).json({
        error: "Email is required",
        status: false,
      });
    }

    // Fetch user from DynamoDB
    const userData = await dynamoDB.get({
      TableName: "Users_dev",
      Key: { email },
    });

    if (!userData.Item) {
      return res.status(404).json({
        error: "User not found",
        status: false,
      });
    }

    let s3UploadResponse;
    const oldProfilePhotoKey = userData.Item.profile?.profilePhotoKey || null;

    if (file) {
      // Upload new profile picture to S3
      s3UploadResponse = await uploadToS3(file, "profile-photos");
    }

    // Update user profile
    const updatedProfile = {
      ...userData.Item.profile,
      profilePhoto: s3UploadResponse
        ? s3UploadResponse.url
        : userData.Item.profile?.profilePhoto,
      profilePhotoKey: s3UploadResponse
        ? s3UploadResponse.key
        : userData.Item.profile?.profilePhotoKey,
    };

    const updatedUserData = {
      ...userData.Item,
      profile: updatedProfile,
      updatedAt: new Date().toISOString(),
    };

    // Save updated user data to DynamoDB
    await dynamoDB.put({
      TableName: "Users_dev",
      Item: updatedUserData,
    });

    // Delete old profile photo from S3 **after** successful update
    if (oldProfilePhotoKey && s3UploadResponse) {
      await removeFromS3(oldProfilePhotoKey);
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      status: true,
      user: {
        fullname: updatedUserData.fullname,
        email: updatedUserData.email,
        role: updatedUserData.role,
        profile: updatedUserData.profile,
      },
    });
  } catch (err) {
    console.error("Profile modification error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

// Function to remove old profile picture from S3
const removeFromS3 = async (fileKey) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
    });

    await s3Client.send(command);
    console.log(`Removed old profile photo: ${fileKey}`);
  } catch (err) {
    console.error("Error removing old profile photo:", err);
  }
};
export const updateProfile = async (req, res) => {
  try {
    const {
      email,
      fullname,
      phoneNumber,
      bio,
      skills,
      jobDomain,
      currentLocation,
      willingToRelocate,
      visaStatus,
      jobTitle,
    } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email is required",
        status: false,
      });
    }

    // Get existing user
    const existingUser = await dynamoDB.get({
      TableName: "Users_dev",
      Key: { email },
    });

    if (!existingUser.Item) {
      return res.status(404).json({
        error: "User not found",
        status: false,
      });
    }

    // Handle file upload to S3
    const file = req.file;
    let resumeUrl = existingUser.Item.profile.resume || null;
    let resumeKey = existingUser.Item.profile.resumeKey || null;
    let resumeOriginalName = existingUser.Item.profile.resumeOriginalName || "";

    if (file) {
      try {
        // If user already has a resume, delete it from S3
        if (existingUser.Item.profile.resumeKey) {
          await deleteFromS3(existingUser.Item.profile.resumeKey);
        }
        // Upload new file to S3 - use same folder as in register
        const s3Response = await uploadToS3(file, "resumes");
        if (s3Response) {
          resumeUrl = s3Response.url;
          resumeKey = s3Response.key;
          resumeOriginalName = file.originalname;
        }
      } catch (uploadError) {
        console.error("Error handling resume:", uploadError);
        // Continue with update even if file upload fails
      }
    }

    // Process skills
    let skillsArray = existingUser.Item.profile.skills || [];
    if (skills) {
      skillsArray = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }

    // Create updated profile object with no undefined values
    const updatedProfile = {
      ...existingUser.Item.profile,
      bio: bio !== undefined ? bio : existingUser.Item.profile.bio || "",
      skills: skillsArray,
      resume: resumeUrl,
      resumeKey: resumeKey,
      resumeOriginalName: resumeOriginalName,
      jobDomain: jobDomain || existingUser.Item.profile.jobDomain || "",
    };

    // Add student-specific fields if user is a student
    if (existingUser.Item.role === "student") {
      updatedProfile.currentLocation = currentLocation || existingUser.Item.profile.currentLocation || "";
      updatedProfile.jobTitle = jobTitle || existingUser.Item.profile.jobTitle || "";

      // Only add these fields if they exist in the request or already exist in the profile
      if (willingToRelocate !== undefined) {
        updatedProfile.willingToRelocate = willingToRelocate;
      } else if (existingUser.Item.profile.willingToRelocate !== undefined) {
        updatedProfile.willingToRelocate = existingUser.Item.profile.willingToRelocate;
      }

      if (visaStatus) {
        updatedProfile.visaStatus = visaStatus;
      } else if (existingUser.Item.profile.visaStatus) {
        updatedProfile.visaStatus = existingUser.Item.profile.visaStatus;
      }
    }

    // Update user in DynamoDB with a more complete UpdateExpression
    await dynamoDB.update({
      TableName: "Users_dev",
      Key: { email },
      UpdateExpression: "set #profile = :profile, #fullname = :fullname, #phoneNumber = :phoneNumber, #updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#profile": "profile",
        "#fullname": "fullname",
        "#phoneNumber": "phoneNumber",
        "#updatedAt": "updatedAt"
      },
      ExpressionAttributeValues: {
        ":profile": updatedProfile,
        ":fullname": fullname || existingUser.Item.fullname,
        ":phoneNumber": phoneNumber ? phoneNumber.toString() : existingUser.Item.phoneNumber,
        ":updatedAt": new Date().toISOString()
      },
      // This is the key fix for preventing the undefined values error
      removeUndefinedValues: true
    });

    // Return updated user
    return res.status(200).json({
      message: "Profile updated successfully",
      status: true,
      user: {
        email,
        fullname: fullname || existingUser.Item.fullname,
        phoneNumber: phoneNumber ? phoneNumber.toString() : existingUser.Item.phoneNumber,
        role: existingUser.Item.role,
        profile: updatedProfile,
      },
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      status: false,
    });
  }
};
// export const updateProfile = async (req, res) => {
//   try {
//     const {
//       email,
//       fullname,
//       phoneNumber,
//       bio,
//       skills,
//       jobDomain,
//       currentLocation,
//       willingToRelocate,
//       visaStatus,
//       jobTitle,
//     } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         error: "Email is required",
//         status: false,
//       });
//     }

//     // Get existing user
//     const existingUser = await dynamoDB.get({
//       TableName: "Users_dev",
//       Key: { email },
//     });

//     if (!existingUser.Item) {
//       return res.status(404).json({
//         error: "User not found",
//         status: false,
//       });
//     }

//     // Handle file upload to S3
//     const file = req.file;
//     let s3Response;

//     if (file) {
//       // If user already has a resume, delete it from S3
//       if (existingUser.Item.profile.resumeKey) {
//         await deleteFromS3(existingUser.Item.profile.resumeKey);
//       }
//       // Upload new file to S3
//       s3Response = await uploadToS3(file, "resumes");
//     }

//     // Process skills
//     let skillsArray = skills
//       ? skills
//           .split(",")
//           .map((skill) => skill.trim())
//           .filter(Boolean)
//       : existingUser.Item.profile.skills;

//     // Prepare update data
//     const updateData = {
//       fullname: fullname || existingUser.Item.fullname,
//       phoneNumber: phoneNumber
//         ? phoneNumber.toString()
//         : existingUser.Item.phoneNumber,
//       updatedAt: new Date().toISOString(),
//       profile: {
//         ...existingUser.Item.profile,
//         bio: bio || existingUser.Item.profile.bio,
//         skills: skillsArray,
//         profilePhoto: existingUser.Item.profile.profilePhoto,
//         jobDomain: jobDomain || existingUser.Item.profile.jobDomain,
//       },
//     };

//     // Update resume if new file uploaded
//     if (s3Response) {
//       updateData.profile.resume = s3Response.url;
//       updateData.profile.resumeKey = s3Response.key; // Store S3 key for future reference
//       updateData.profile.resumeOriginalName = file.originalname;
//     }

//     // Add student-specific fields if user is a student
//     if (existingUser.Item.role === "student") {
//       updateData.profile = {
//         ...updateData.profile,
//         currentLocation:
//           currentLocation || existingUser.Item.profile.currentLocation,
//         willingToRelocate:
//           willingToRelocate !== undefined
//             ? willingToRelocate
//             : existingUser.Item.profile.willingToRelocate,
//         visaStatus: visaStatus || existingUser.Item.profile.visaStatus,
//         jobTitle: jobTitle || existingUser.Item.profile.jobTitle,
//       };
//     }

//     // Update user in DynamoDB
//     await dynamoDB.update({
//       TableName: "Users_dev",
//       Key: { email },
//       UpdateExpression: "set #userData = :userData",
//       ExpressionAttributeNames: {
//         "#userData": "profile",
//       },
//       ExpressionAttributeValues: {
//         ":userData": updateData.profile,
//       },
//     });

//     // Return updated user
//     return res.status(200).json({
//       message: "User updated successfully",
//       status: true,
//       user: {
//         email,
//         fullname: updateData.fullname,
//         phoneNumber: updateData.phoneNumber,
//         role: existingUser.Item.role,
//         profile: updateData.profile,
//       },
//     });
//   } catch (err) {
//     console.error("Profile update error:", err);
//     return res.status(500).json({
//       error: "Internal Server Error",
//       message: err.message,
//       status: false,
//     });
//   }
// };

// Function to delete old resume from S3
const deleteFromS3 = async (resumeKey) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: resumeKey,
    });

    await s3Client.send(command);
    console.log(`Deleted old resume: ${resumeKey}`);
  } catch (err) {
    console.error("Error deleting old resume:", err);
  }
};

export const getStudents = async (req, res) => {
  try {
    const params = {
      TableName: "Users_dev",
      IndexName: "RoleIndex",
      KeyConditionExpression: "#role = :roleValue",
      ExpressionAttributeNames: {
        "#role": "role",
      },
      ExpressionAttributeValues: {
        ":roleValue": "student",
      },
    };

    const result = await dynamoDB.query(params);

    // Remove password from results
    const students = result.Items.map((student) => {
      const { password, ...studentData } = student;
      return studentData;
    });

    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    const result = await dynamoDB.get({
      TableName: "Users_dev",
      Key: { email },
    });

    const user = result.Item;

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    const tokenData = {
      userId: user.email, // Using email as the unique identifier
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // Remove password from user object
    const { password: userPassword, ...userData } = user;
    // await sendEmail('loginAlert', email, {
    //   fullname: user.fullname,
    //   loginTime: new Date().toLocaleString(),
    //   deviceInfo: req.headers['user-agent']
    // });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
      success: false,
    });
  }
};

//logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "User logged out successfully",
      status: true,
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Controller for initiating forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Get user by email (primary key)
    const getCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        email: email,
      },
    });

    const { Item } = await docClient.send(getCommand);

    if (!Item) {
      return res.status(404).json({
        success: false,
        message: "User with this email doesn't exist",
      });
    }

    const verificationCode = generateVerificationCode();
    const expiryTime = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Update user with reset code using email as the primary key
    const updateCommand = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        email: email,
      },
      UpdateExpression:
        "SET resetPasswordCode = :code, resetPasswordExpires = :expiry",
      ExpressionAttributeValues: {
        ":code": verificationCode,
        ":expiry": expiryTime,
      },
      ReturnValues: "NONE",
    });

    await docClient.send(updateCommand);

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Verification Code",
      html: `
        <h1>Password Reset Request</h1>
        <p>Your verification code is: <strong>${verificationCode}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Verification code sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Error sending verification code",
    });
  }
};

// Controller for verifying the code
export const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: "Email and code are required",
      });
    }

    // Get user by email (primary key)
    const getCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        email: email,
      },
    });

    const { Item } = await docClient.send(getCommand);

    if (!Item) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    const currentTime = Date.now();

    if (
      Item.resetPasswordCode !== code ||
      Item.resetPasswordExpires < currentTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    res.status(200).json({
      success: true,
      message: "Code verified successfully",
    });
  } catch (error) {
    console.error("Verify code error:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying code",
    });
  }
};

// Controller for resetting the password
export const resetPassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, code, and password are required",
      });
    }

    // Get user by email (primary key)
    const getCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        email: email,
      },
    });

    const { Item } = await docClient.send(getCommand);

    if (!Item) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    const currentTime = Date.now();

    if (
      Item.resetPasswordCode !== code ||
      Item.resetPasswordExpires < currentTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear reset fields
    const updateCommand = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        email: email,
      },
      UpdateExpression:
        "SET password = :password REMOVE resetPasswordCode, resetPasswordExpires",
      ExpressionAttributeValues: {
        ":password": hashedPassword,
      },
      ReturnValues: "NONE",
    });

    await docClient.send(updateCommand);

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Error resetting password",
    });
  }
};
// Controller functions for the enhanced candidate viewing system

// Controller to fetch a student by ID with view tracking
// Controller functions for the enhanced candidate viewing system

// Controller to fetch a student by ID with view tracking
export const getStudentById = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { email, viewerId } = req.body; // Get from request body

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    if (!viewerId) {
      return res.status(400).json({
        success: false,
        message: "Viewer ID is required for accessing student profiles",
      });
    }

    // 1. Find the company associated with the viewer/recruiter
    let companyParams = {
      TableName: "Companies_dev",
      IndexName: "UserIdIndex",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": viewerId
      }
    };

    let companyResult = await dynamoDB.query(companyParams);
    let company = null;

    // If not found as primary user, check if recruiter is in userIds array
    if (!companyResult.Items || companyResult.Items.length === 0) {
      const scanParams = {
        TableName: "Companies_dev",
        FilterExpression: "contains(userIds, :userId)",
        ExpressionAttributeValues: {
          ":userId": viewerId
        }
      };

      const scanResult = await dynamoDB.scan(scanParams);

      if (scanResult.Items && scanResult.Items.length > 0) {
        company = scanResult.Items[0];
      }
    } else {
      company = companyResult.Items[0];
    }

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "No company found for this recruiter",
      });
    }

    const companyId = company.companyId;

    // 2. Check if company has remaining views
    const remainingViews = company.remainingViews || 0;

    if (remainingViews <= 0) {
      return res.status(403).json({
        success: false,
        message: "No remaining views available for your company",
        data: {
          remainingViews: 0
        }
      });
    }

    // 3. Get the viewer (recruiter) information
    const viewerParams = {
      TableName: "Users_dev",
      Key: {
        email: viewerId
      }
    };

    const viewerResult = await dynamoDB.get(viewerParams);

    if (!viewerResult.Item) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    const viewer = viewerResult.Item;

    // Initialize viewedStudents array if it doesn't exist
    if (!viewer.viewedStudents) {
      viewer.viewedStudents = [];
    }

    // Check if this recruiter has already viewed this candidate
    const hasViewedBefore = viewer.viewedStudents.includes(studentId);

    // 4. Get the student information
    const studentParams = {
      TableName: "Users_dev",
      Key: {
        email: studentId
      }
    };

    const studentResult = await dynamoDB.get(studentParams);

    if (!studentResult.Item) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Remove sensitive information
    const { password, ...studentInfo } = studentResult.Item;

    // 5. If this is a new view, update the company and recruiter records
    // if (!hasViewedBefore) {
      // Update in parallel for better performance
      const updatePromises = [];

      // 5a. Decrement company's remaining views
      updatePromises.push(
        dynamoDB.update({
          TableName: "Companies_dev",
          Key: {
            companyId: companyId
          },
          UpdateExpression: "SET remainingViews = remainingViews - :val",
          ExpressionAttributeValues: {
            ":val": 1
          },
          ReturnValues: "UPDATED_NEW"
        })
      );

      // 5b. Add studentId to recruiter's viewedStudents array
      updatePromises.push(
        dynamoDB.update({
          TableName: "Users_dev",
          Key: {
            email: viewerId
          },
          UpdateExpression: `
            SET viewedStudents = list_append(if_not_exists(viewedStudents, :empty_list), :studentId),
                personalViewCount = if_not_exists(personalViewCount, :zero) + :one
          `,
          ExpressionAttributeValues: {
            ":empty_list": [],
            ":studentId": [studentId],
            ":zero": 0,
            ":one": 1
          },
          ReturnValues: "UPDATED_NEW"
        })
      );

      // 5c. Track company recruiter view in a CompanyViews table
      updatePromises.push(
        dynamoDB.put({
          TableName: "CompanyViews_dev",
          Item: {
            viewId: `${companyId}:${viewerId}:${studentId}:${new Date().toISOString()}`,
            companyId: companyId,
            recruiterId: viewerId,
            studentId: studentId,
            timestamp: new Date().toISOString()
          }
        })
      );

      try {
        // Wait for all updates to complete
        await Promise.all(updatePromises);
      } catch (updateError) {
        console.error("Error updating view records:", updateError);
        // Continue with the response even if update fails
      }


    // Get updated company view count
    const updatedCompanyParams = {
      TableName: "Companies_dev",
      Key: {
        companyId: companyId
      },
      ProjectionExpression: "remainingViews"
    };

    const updatedCompany = await dynamoDB.get(updatedCompanyParams);

    // Get updated recruiter view count
    const updatedViewerParams = {
      TableName: "Users_dev",
      Key: {
        email: viewerId
      },
      ProjectionExpression: "personalViewCount"
    };

    const updatedViewer = await dynamoDB.get(updatedViewerParams);

    // Return student information with remaining views count and personal view count
    res.status(200).json({
      success: true,
      message: "Student details fetched successfully",
      data: studentInfo,
      remainingViews: updatedCompany.Item?.remainingViews || 0,
      personalViewCount: updatedViewer.Item?.personalViewCount || 0,
      viewedBefore: hasViewedBefore
    });
  } catch (error) {
    console.error("Error in getStudentById:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch student details",
      error: error.message,
    });
  }
};

// Get minimal student details for initial card display
export const getMinimalStudentDetails = async (req, res) => {
  try {
    // Get recruiter ID from request body
    const recruiterId = req.body.email;

    // Query students with student role
    const params = {
      TableName: "Users_dev",
      IndexName: "RoleIndex",
      KeyConditionExpression: "#role = :roleValue",
      ExpressionAttributeNames: {
        "#role": "role",
      },
      ExpressionAttributeValues: {
        ":roleValue": "student",
      },
    };

    const result = await dynamoDB.query(params);
    console.log(result)

    // Get the recruiter's previously viewed students for marking
    const recruiterParams = {
      TableName: "Users_dev",
      Key: {
        email: recruiterId
      },
      ProjectionExpression: "viewedStudents"
    };

    const recruiterResult = await dynamoDB.get(recruiterParams);
    const viewedStudents = recruiterResult.Item?.viewedStudents || [];

    // Extract comprehensive details for each student (excluding resume, phone, email)
    const minimalStudentDetails = result.Items.map((student) => {
      return {
        _id: student._id || student.email,
        fullname: student.fullname || "No Name",
        viewedByMe: viewedStudents.includes(student.email),
        createdAt: student.createdAt,
        updatedAt: student.updatedAt,
        role: student.role,
        profile: {
          profilePhoto: student.profile?.profilePhoto,
          jobTitle: student.profile?.jobTitle || "No title",
          currentLocation: student.profile?.currentLocation || "N/A",
          jobDomain: student.profile?.jobDomain,
          bio: student.profile?.bio,
          skills: student.profile?.skills || [],
          visaStatus: student.profile?.visaStatus,
          willingToRelocate: student.profile?.willingToRelocate
        }
      };
    });

    res.status(200).json({
      success: true,
      message: "Minimal student details fetched successfully",
      data: minimalStudentDetails,
    });
  } catch (error) {
    console.error("Error in getMinimalStudentDetails:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch minimal student details",
      error: error.message,
    });
  }
};
// export const getMinimalStudentDetails = async (req, res) => {
//   try {
//     // Get recruiter ID from request body
//     const recruiterId = req.body.email;

//     // Query students with student role
//     const params = {
//       TableName: "Users",
//       IndexName: "RoleIndex",
//       KeyConditionExpression: "#role = :roleValue",
//       ExpressionAttributeNames: {
//         "#role": "role",
//       },
//       ExpressionAttributeValues: {
//         ":roleValue": "student",
//       },
//     };

//     const result = await dynamoDB.query(params);

//     // Get the recruiter's previously viewed students for marking
//     const recruiterParams = {
//       TableName: "Users_dev",
//       Key: {
//         email: recruiterId
//       },
//       ProjectionExpression: "viewedStudents"
//     };

//     const recruiterResult = await dynamoDB.get(recruiterParams);
//     const viewedStudents = recruiterResult.Item?.viewedStudents || [];

//     // Extract only minimal details for each student
//     const minimalStudentDetails = result.Items.map((student) => {
//       return {
//         _id: student._id || student.email,
//         fullname: student.fullname || "No Name",
//         email: student.email,
//         // Mark if this recruiter has viewed this student before
//         viewedByMe: viewedStudents.includes(student.email),
//         profile: {
//           profilePhoto: student.profile?.profilePhoto,
//           jobTitle: student.profile?.jobTitle || "No title",
//           currentLocation: student.profile?.currentLocation || "N/A"
//         }
//       };
//     });

//     res.status(200).json({
//       success: true,
//       message: "Minimal student details fetched successfully",
//       data: minimalStudentDetails,
//     });
//   } catch (error) {
//     console.error("Error in getMinimalStudentDetails:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch minimal student details",
//       error: error.message,
//     });
//   }
// };

// Get company details by user ID (for frontend to display remaining views)
export const getCompanyByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const requestingUserEmail = req.body.email;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // First, try to find company where user is primary user
    let companyParams = {
      TableName: "Companies_dev",
      IndexName: "UserIdIndex",
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId
      }
    };

    let companyResult = await dynamoDB.query(companyParams);

    // If not found as primary user, scan for the user in userIds array
    if (!companyResult.Items || companyResult.Items.length === 0) {
      const scanParams = {
        TableName: "Companies_dev",
        FilterExpression: "contains(userIds, :userId)",
        ExpressionAttributeValues: {
          ":userId": userId
        }
      };

      const scanResult = await dynamoDB.scan(scanParams);

      if (!scanResult.Items || scanResult.Items.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No company found for this user",
        });
      }

      companyResult = { Items: [scanResult.Items[0]] };
    }

    const company = companyResult.Items[0];

    // Get recruiter's personal view count
    const recruiterParams = {
      TableName: "Users_dev",
      Key: {
        email: userId
      },
      ProjectionExpression: "personalViewCount, fullname"
    };

    const recruiterResult = await dynamoDB.get(recruiterParams);
    const personalViewCount = recruiterResult.Item?.personalViewCount || 0;
    const recruiterName = recruiterResult.Item?.fullname || "Unknown";

    // Return company information with recruiter's personal view count
    res.status(200).json({
      success: true,
      message: "Company details fetched successfully",
      data: {
        companyId: company.companyId,
        companyName: company.CompanyName || company.companyName,
        remainingViews: company.remainingViews || 0,
        logo: company.logo,
        recruiterName: recruiterName,
        personalViewCount: personalViewCount
      }
    });
  } catch (error) {
    console.error("Error in getCompanyByUserId:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch company details",
      error: error.message,
    });
  }
};

// New API to get views statistics for a company's recruiters
export const getCompanyViewStats = async (req, res) => {
  try {
    const { companyId } = req.params;
    const userEmail = req.body.email;

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    // Get company information
    const companyParams = {
      TableName: "Companies_dev",
      Key: {
        companyId: companyId
      }
    };

    const companyResult = await dynamoDB.get(companyParams);

    if (!companyResult.Item) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const company = companyResult.Item;
    const userIds = [company.userId, ...(company.userIds || [])].filter(Boolean);

    // Get recruiters' view stats
    const recruiterPromises = userIds.map(async (userId) => {
      const userParams = {
        TableName: "Users_dev",
        Key: {
          email: userId
        },
        ProjectionExpression: "email, fullname, personalViewCount, viewedStudents"
      };

      const userResult = await dynamoDB.get(userParams);

      if (userResult.Item) {
        return {
          email: userResult.Item.email,
          fullname: userResult.Item.fullname || "Unknown",
          viewCount: userResult.Item.personalViewCount || 0,
          uniqueCandidatesViewed: userResult.Item.viewedStudents ?
            userResult.Item.viewedStudents.length : 0
        };
      }

      return null;
    });

    const recruitersStats = (await Promise.all(recruiterPromises)).filter(Boolean);

    res.status(200).json({
      success: true,
      message: "Company view statistics fetched successfully",
      data: {
        companyId: company.companyId,
        companyName: company.CompanyName || company.companyName,
        remainingViews: company.remainingViews || 0,
        initialViewCount: company.initialViewCount || 0,
        recruiters: recruitersStats
      }
    });
  } catch (error) {
    console.error("Error in getCompanyViewStats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch company view statistics",
      error: error.message,
    });
  }
};