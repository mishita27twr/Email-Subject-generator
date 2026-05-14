import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateSubjectLines = async (
  emailText,
  tone,
  count = 5
) => {

  const prompt = `
Generate ${count} email subject lines.

Email content:
${emailText}

Tone:
${tone}

Rules:
- Keep them short
- Make them engaging
- Match the tone properly
- Avoid spammy wording

Return only subject lines as a numbered list.
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.8,
  });

  const text = response.choices[0].message.content;

  const subjects = text
    .split("\n")
    .map((line) =>
      line.replace(/^\d+[\).\-\s]*/, "").trim()
    )
    .filter(Boolean);

  return subjects;
};