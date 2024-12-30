// /api/getRecordById.js
import connectToDatabase from "@/lib/mongodb"; // Connect to database helper
import GeminiResponse from "@/models/GeminiResponse"; // Import the GeminiResponse model

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { id } = req.query;

  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch the record by its id from the GeminiResponse collection
    const record = await GeminiResponse.findById(id);
    console.log(record);

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    // Send the record as a response
    res.status(200).json({
      message: "Record fetched successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error fetching record:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
