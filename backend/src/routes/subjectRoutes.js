import express from "express";
import { generateSubjects } from "../controllers/subjectController.js";

const router = express.Router();

router.post("/generate", generateSubjects);

export default router;