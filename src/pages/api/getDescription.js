import connectToDatabase from "@/lib/mongodb"; // MongoDB connection
import GeminiResponse from "@/models/GeminiResponse"; // Import your model
import jwt from "jsonwebtoken"; // JWT library

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Check if the request has an authorization header with a token
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // Log the decoded token for debugging

    await connectToDatabase();

    // Fetch the records that belong to the authenticated user based on their userId
    const records = await GeminiResponse.find({ user: decoded.userId }); // Filter by userId
    console.log("Querying for userId:", decoded.userId); // Log the query to check what we're searching for
    console.log("User's records:", records); // Log the records to verify the results

    if (!records || records.length === 0) {
      return res.status(404).json({ error: "No records found for this user" });
    }

    // Send the user's records as a response
    res.status(200).json({
      message: "Records fetched successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching records:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
