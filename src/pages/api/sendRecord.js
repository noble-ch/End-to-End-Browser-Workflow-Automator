import formidable from "formidable";
import fs from "fs";
import path from "path";
import connectToDatabase from "@/lib/mongodb";
import GeminiResponse from "@/models/GeminiResponse";
import jwt from "jsonwebtoken";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({
      keepExtensions: true,
    });
    try {
      // Parse the form data
      const [fields, files] = await form.parse(req);
      console.log("Fields:", fields);

      // Extract the necessary fields and file data
      const title = fields.title?.[0]; // Optional chaining in case the field is missing
      const description = fields.description?.[0];
      const file = files.file?.[0]; // The uploaded file

      // Validate required fields
      if (!title || !description) {
        return res
          .status(400)
          .json({ error: "Title and description are required." });
      }
      if (!file) {
        return res.status(400).json({ error: "No file uploaded." });
      }
      // Ensure the file is a JavaScript file
      if (
        file.mimetype !== "application/javascript" &&
        !file.originalFilename.endsWith(".js")
      ) {
        return res
          .status(400)
          .json({ error: "The uploaded file must be a JavaScript file." });
      }
      // Read the file as text (JavaScript code)
      const fileData = fs.readFileSync(file.filepath, "utf-8");

      if (!fileData) {
        return res.status(400).json({ error: "File is empty." });
      }
      // Extract user info from the request headers (Assume token is passed in Authorization header)
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ error: "Authentication token is missing." });
      }
      // Verify the JWT token and extract user information (e.g., user ID)
      let user;
      try {
        user = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
      } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      console.log("Authenticated User:", user);
      // Connect to the database
      await connectToDatabase();
      // Create the response object for MongoDB, storing the JS code as a string
      const geminiResponse = new GeminiResponse({
        title,
        description,
        file: {
          filename: file.originalFilename, // Store the file's name
          contentType: file.mimetype, // Store the file's MIME type
          content: fileData, // Store the JS code as a string
        },
        user: user.userId, // Store the user ID in the database
      });

      // Save the data to MongoDB
      const savedItem = await geminiResponse.save();
      console.log("Saved Item:", savedItem);
      // Respond with success
      res.status(200).json({
        message: "File uploaded and code extracted successfully",
        data: savedItem,
      });
    } catch (error) {
      console.error("Error processing the upload:", error.message);
      res.status(500).json({ error: "Error processing the upload." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
