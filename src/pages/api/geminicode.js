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
                text: `Generate a Puppeteer script that automates the following tasks step-by-step. The script should ensure that each step is executed sequentially with clear handling for loading, waiting, and interacting with elements as described. Here is the detailed description of the tasks to automate:
      
                1. Launch a new browser instance using 'import' for Puppeteer (without using 'const' or 'var'). Example: import puppeteer from 'puppeteer';
                2. Open a new page in the browser.
                3. Set the page's default timeout to 5000 milliseconds.
                4. Set the viewport size to 1356x931 pixels.
                5. Navigate to the specified URL. Log "Navigating to the URL..." when this step starts.
                6. Wait for the page to load completely. This should wait until the page finishes loading, checking if critical elements are rendered.
                7. If the navigation times out, log the error and retry the navigation once.
                8. Log the message "Page loaded successfully" once the page has fully loaded.
                9. Wait for a key element (e.g., header or navigation bar) to ensure the page is ready for interactions. This should be handled using 'waitForSelector' to ensure the element is visible.
                10. Log a message like "Element found and ready for interaction!" once the element appears.
                11. Close the browser after completing all steps.
      
                The script should:
                - Use 'waitForSelector' to ensure elements are present before interacting.
                - Handle navigation errors gracefully by retrying the navigation on failure.
                - Handle other errors gracefully, retrying if necessary.
                - Provide comments in the code to explain each step, including any wait conditions for loading and checking page readiness.
                Here is the description:\n\n${description} `,
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
