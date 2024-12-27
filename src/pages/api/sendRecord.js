import path from "path";
import { promises as fs } from "fs";
import { generateDescription } from "./generateDescription"; // assuming this is your function that generates descriptions

export default async function handler(req, res) {
  if (req) {
    try {
      // Check if file is included in the request
      if (!req.files || !req.files.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Extract the file and other data from the request
      const { file } = req.files;
      const title = req.body.title || "";
      const description = req.body.description || "";

      console.log("Uploaded file:", file);
      console.log("Title:", title);
      console.log("Description:", description);

      // Call the function to generate the description based on the file
      const geminiResponse = await generateDescription(
        file,
        title,
        description
      );

      // Send the response back to the client
      return res.status(200).json(geminiResponse); // Sending Gemini's response back to the client
    } catch (error) {
      console.error("Error handling request:", error.message);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
