import { dynamoDB } from "../config/aws.config.js";

const TABLE_NAME = process.env.NEWSLETTER_TABLE || "Newsletter_dev";

export const subscribe = async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    await dynamoDB.put({
      TableName: TABLE_NAME,
      Item: {
        email,
        subscribedAt: new Date().toISOString(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Subscription successful",
    });
  } catch (error) {
    console.error("Newsletter subscribe error:", error.message);
    return res.status(503).json({
      success: false,
      message: "Subscription is unavailable right now",
    });
  }
};
