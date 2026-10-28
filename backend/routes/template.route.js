import express from "express";
import { getTemplate } from "../controllers/template.controller.js";

const router = express.Router();

router.get("/:id", getTemplate);

export default router;
