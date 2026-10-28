import { v4 as uuidv4 } from "uuid";
import { dynamoDB } from "../config/aws.config.js";
import { selectPublicTestimonials } from "../utils/publicTestimonial.js";

const TABLE_NAME = process.env.FEEDBACK_TABLE || "Feedback_dev";

const readFeedbackItems = async () => {
  const items = [];
  let ExclusiveStartKey;
  do {
    const page = await dynamoDB.scan({
      TableName: TABLE_NAME,
      ExclusiveStartKey,
    });
    items.push(...(page.Items || []));
    ExclusiveStartKey = page.LastEvaluatedKey;
  } while (ExclusiveStartKey);
  return items;
};

export const getTestimonials = async (req, res) => {
  try {
    const type = typeof req.query.type === "string" ? req.query.type : "";
    const items = await readFeedbackItems();
    const data = selectPublicTestimonials(items, type || undefined);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Public testimonials error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not load testimonials",
    });
  }
};

export const submitFeedback = async (req, res) => {
  try {
    const { type, name, email, rating, issueType, severity, message } = req.body || {};
    const trimmedMessage = String(message || "").trim();
    const trimmedName = String(name || "").trim();
    const trimmedEmail = String(email || "").trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and a message are required",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }

    const item = {
      id: uuidv4(),
      type: type === "issue" ? "issue" : "feedback",
      name: trimmedName,
      email: trimmedEmail,
      rating: Number(rating) || null,
      issueType: issueType || null,
      severity: severity || null,
      message: trimmedMessage,
      published: false,
      createdAt: new Date().toISOString(),
    };

    await dynamoDB.put({
      TableName: TABLE_NAME,
      Item: item,
    });

    return res.status(201).json({
      success: true,
      message: "Thanks. Your note was received and is not shown publicly until it is approved.",
    });
  } catch (error) {
    console.error("Submit feedback error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Could not save feedback",
    });
  }
};
