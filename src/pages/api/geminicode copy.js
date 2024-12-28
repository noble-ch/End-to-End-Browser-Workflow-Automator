import fetch from "node-fetch";

export default async function handler(req, res) {
  console.log("Method:", req.method);
  console.log("Body:", req.body);

  if (req.method === "POST") {
    try {
      const { description } = req.body;

      if (!description) {
        return res.status(400).json({ error: "Description is required" });
      }

      const jsonData = {
        contents: [
          {
            parts: [
              {
                text: `Based on the following description, generate a Puppeteer script. The script should automate the described tasks step-by-step. Here is the description:\n\n${description}`,
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
      res.status(200).json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
