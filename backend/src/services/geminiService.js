import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateSubjectLines = async (
  emailText,
  tone,
  count
) => {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
Generate ${count || 5} email subject lines.

Email content:
${emailText}

Tone:
${tone}

Rules:
- Keep them short
- Make them engaging
- Match the selected tone
- Avoid spammy words
- Return only subject lines as a numbered list
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};