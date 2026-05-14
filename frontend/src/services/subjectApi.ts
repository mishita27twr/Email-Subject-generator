import axios from "axios";

export const generateSubjects = async (emailText: string, tone: string, count: number): Promise<{ success: boolean; subjects: string[] }> => {
  try {
    const response = await axios.post("https://email-subject-generator-dyq5.onrender.com/api/subjects/generate", {
      emailText,
      tone,
      count,
    });
    return response.data;
  } catch (error) {
    console.error("Error generating subjects:", error);
    throw new Error("Failed to generate subjects");
  }
};
