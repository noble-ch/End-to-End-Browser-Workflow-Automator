import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { description, recordId } = req.body;

      if (!description) {
        return res.status(400).json({ error: "Description is required" });
      }
      const jsonData = {
        contents: [
          {
            parts: [
              {
                text: `Given a Puppeteer script, add a screenshot at each major step, saving the screenshots to the directory '/output/${recordId}/' relative to the project root. The screenshots should be named 'step1_viewport.png', 'step2_navigation.png', etc. make sure the timeout is a 2-minute timeout for all steps. Here is the updated Puppeteer code (only the updated code, no explanation needed):\n\n${description}`,
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

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Gemini Response:", responseData);

      // Extract only the Puppeteer script from the response
      const puppeteerScript =
        responseData.candidates[0]?.content?.parts[0]?.text;

      if (!puppeteerScript) {
        return res
          .status(500)
          .json({ error: "Puppeteer script not found in response" });
      }

      // Clean the script by removing unnecessary information and formatting it as JavaScript
      const formattedScript = `\`\`\`javascript\n${puppeteerScript}\n\`\`\``;

      // Send the formatted Puppeteer script back to the user
      res.status(200).json({ script: formattedScript });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
