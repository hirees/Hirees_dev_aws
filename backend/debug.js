// NodeMailer Send Email Script (ESM)
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_APP_PASSWORD;
const RECIPIENT_EMAIL = process.env.EMAIL_USER;

async function sendEmail() {
  if (!EMAIL_USER || !EMAIL_PASSWORD) {
    console.error("Set EMAIL_USER and EMAIL_APP_PASSWORD before running this script.");
    return false;
  }
  console.log("Starting email sending process...");

  try {
    // Create a transporter with your credentials
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Using Gmail service
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      }
    });

    console.log("Transporter created, sending email...");

    // Send the email
    const info = await transporter.sendMail({
      from: `"Support Team" <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: "Test Email from NodeMailer",
      text: "This is a test email sent using NodeMailer. If you're receiving this, the email service is working correctly!",
      html: "<p>This is a test email sent using NodeMailer.</p><p><b>If you're receiving this, the email service is working correctly!</b></p>"
    });

    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);

    return true;
  } catch (error) {
    console.error("ERROR SENDING EMAIL:");
    console.error(error);

    // Check for common issues
    if (error.code === 'EAUTH') {
      console.error("Authentication failed - check your email and password");
    } else if (error.code === 'ESOCKET') {
      console.error("Connection issue - check your internet connection");
    }

    return false;
  }
}

// Run the function
sendEmail()
  .then(success => {
    console.log("Operation completed:", success ? "SUCCESS" : "FAILED");
    if (!success) {
      console.log("\nTROUBLESHOOTING TIPS:");
      console.log("1. Verify your email credentials are correct");
      console.log("2. For Gmail: Make sure 2FA is enabled and you're using an App Password");
      console.log("3. Check if the recipient email address is valid");
    }
  });