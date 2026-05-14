import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import subjectRoutes from "./routes/subjectRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Email Subject Generator API Running");
});

app.use("/api/subjects", subjectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});