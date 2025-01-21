//api/sendRecord.js
import formidable from "formidable";
import fs from "fs";
import connectToDatabase from "@/lib/mongodb";
import Task from "@/models/Task";
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

      // Extract the necessary fields and file data
      const title = fields.title?.[0];
      const description = fields.description?.[0];
      const file = files.file?.[0];

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
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ error: "Authentication token is missing." });
      }
      let user;
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token." });
      }
      // Connect to the database
      await connectToDatabase();

      const task = new Task({
        title,
        description,
        file: {
          filename: file.originalFilename,
          contentType: file.mimetype,
          content: fileData,
        },
        user: user.userId,
      });

      const savedItem = await task.save();
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
