import connectToDatabase from "@/lib/mongodb"; // MongoDB connection
import GeminiResponse from "@/models/GeminiResponse"; // Import your model
import Description from "@/models/Description"; 

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all records from the database
    const records = await Description.find({}); // No user-based filtering
    // console.log("Fetched records:", records); // Log the records for debugging

    if (!records || records.length === 0) {
      return res.status(404).json({ error: "No records found" });
    }

    // Send the records as a response
    res.status(200).json({
      message: "Records fetched successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching records:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
