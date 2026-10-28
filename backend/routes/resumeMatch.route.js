import express from "express";
import multer from "multer";
import {
  googleSignIn,
  magicLinkJson,
  requestMagicLink,
  uploadForMatch,
} from "../controllers/resumeMatch.controller.js";
import { MAX_RESUME_BYTES } from "../resume/storage.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_RESUME_BYTES },
});

const router = express.Router();

router.post("/upload", (req, res, next) => {
  upload.single("resume")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Resume must be a PDF or DOCX of 5 MB or less.",
      });
    }
    return next();
  });
}, uploadForMatch);
router.post("/magic-link", requestMagicLink);
router.get("/magic", magicLinkJson);
router.post("/google", googleSignIn);

export default router;
