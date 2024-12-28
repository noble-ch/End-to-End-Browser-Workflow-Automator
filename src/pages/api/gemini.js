import path from "path";
import { promises as fs } from "fs";
import fetch from "node-fetch"; // Ensure you have node-fetch installed
import GeminiResponse from "@/models/GeminiResponse";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Load the test_puppeteer.js file from the public folder
      const filePath = path.join(process.cwd(), "public", "test_puppeteer.js");
      const fileData = await fs.readFile(filePath, "utf8");

      // Prepare the request payload for the Gemini API
      const jsonData = {
        contents: [
          {
            parts: [
              {
                text: `Given the following Puppeteer script, break it down into the individual steps. Focus on providing a clear step-by-step explanation, numbered from 1 to n. Do not include any introductory text or context, just the breakdown of each step in the process of automation. Here is the Puppeteer script:\n\n${fileData}`,
              },
            ],
          },
        ],
      };

      const apiKey = process.env.GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        }
      );

      const responseData = await response.json();

      // Send the response data back to the client
      res.status(200).json(responseData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
