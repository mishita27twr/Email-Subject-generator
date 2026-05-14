import allowedTones from "../utils/allowedTones.js";
import { generateSubjectLines } from "../services/geminiService.js";

export const generateSubjects = async (req, res) => {

  try {

    const { emailText, tone, count } = req.body;

    if (!emailText) {
      return res.status(400).json({
        success: false,
        message: "Email text is required",
      });
    }

    if (!allowedTones.includes(tone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tone selected",
      });
    }

    const subjects = await generateSubjectLines(
      emailText,
      tone,
      count
    );

    res.status(200).json({
      success: true,
      subjects,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate subject lines",
    });
  }
};