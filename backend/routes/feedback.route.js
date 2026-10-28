import express from "express";
import { getTestimonials, submitFeedback } from "../controllers/feedback.controller.js";

const router = express.Router();

router.get("/testimonials", getTestimonials);
router.post("/submit", submitFeedback);

export default router;
