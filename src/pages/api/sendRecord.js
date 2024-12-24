// pages/api/sendRecord.js
// pages/api/sendRecord.js
// pages/api/sendRecord.js
import { connectToDatabase } from "../../lib/mongodb";
import { generateDescription } from "../../lib/openai.js"; 

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { record, prompt } = req.body;

  if (!record || !prompt) {
    return res.status(400).json({ error: "Record and prompt are required" });
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("records");

    const newRecord = { record, prompt, createdAt: new Date() };
    const result = await collection.insertOne(newRecord);

    // Generate description using the AI
    const description = await generateDescription(prompt);

    return res.status(201).json({
      message: "Record saved successfully",
      id: result.insertedId,
      description,
    });
  } catch (error) {
    console.error("Failed to save record:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
