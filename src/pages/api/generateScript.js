import fetch from "node-fetch";
import GeneratedScript from "@/models/GeneratedScript";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { description, recordId } = req.body;

      if (!description) {
        return res.status(400).json({ error: "Description is required" });
      }

      // Check if the GeneratedScript with the recordId already exists in the database
      const existingGeneratedScript = await GeneratedScript.findOne({
        recordId,
      });
      if (existingGeneratedScript) {
        // If found, return the existing script
        return res.status(200).json({
          script: existingGeneratedScript.script,
          id: existingGeneratedScript._id,
        });
      }

      const script = description;

      // Generate a new script using Gemini API if not found in the database
      const jsonData = {
        contents: [
          {
            parts: [
              {
                text: `When processing the provided script, always adhere to these guidelines:
      1. Do not include any introductory text, descriptions, or comments about the code.
      2. Do not include unnecessary steps or take screenshots of the viewport unless specified as part of the step.
      3. Only provide the updated code with clear implementation.
      
      **Rules for execution and logging:**
      - Each major step must:
        1. Save a screenshot to the dynamically created directory at '\${outputDir}/', use name format as '\ step_01_task_name'\, '\ step_02_task_name\', etc. (e.g., 'step_01_navigate_to_example.png') add 0 before steps for the steps 1-9 for better consistecy.
        2. Log structured data with these fields:
           - \`timestamp\`: The time the step was executed.
           - \`stepName\`: A brief description of the step.
           - \`performanceMetrics\`: Performance data such as page load time.
           - \`result\`: Output of the step (e.g., page content, validation results).
           - \`error\` (if applicable): Detailed error information.
        3. Implement a timeout of 1 minute for each step.
        4. Write the logs to a JSON file named 'execution_logs.json' in the output directory.
      
      **Consistency for logs and content:**
      - Ensure the data type for logs and content is consistent:
        - If the API sometimes returns valid JSON strings and sometimes plain text, first verify the type of the data.
        - If the data is plain text, convert it to JSON format before processing.
        - Always work with valid JSON data to prevent runtime issues.
      
      **Updated Prompt Structure:**
      1. Provide the updated code directly without explanations, comments, or descriptions.
      2. Use the existing Puppeteer example as a baseline to update the code.
      3. Strictly adhere to the guidelines and rules specified above.
      3. When naming screenshots startwith step_01 then the task done 
      4. set viewport width: 1440, height: 900
      
      The example Puppeteer script should follow these rules to dynamically create the directory, log performance metrics, and handle errors effectively. Example:
      \`\`\`javascript
      const puppeteer = require('puppeteer');
      const fs = require('fs');
      const path = require('path');
      
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const logs = [];
        const recordId = '123';
        const runId = '456';
        const outputDir = path.join(__dirname, \`public/output/\${recordId}/\${runId}\`);
        fs.mkdirSync(outputDir, { recursive: true });
        await page.setViewport({ width: 1440, height: 900 });
      
        try {
          const stepName = 'Navigate to Example';
          const startTime = Date.now();
          const timeout = 60000;
          const navigationPromise = page.goto('https://example.com');
          await Promise.race([
            navigationPromise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Step timeout exceeded')), timeout)),
          ]);
          const endTime = Date.now();
          const screenshotPath = path.join(outputDir, 'step_01_navigate_to_example.png');
          await page.screenshot({ path: screenshotPath });
          logs.push({
            timestamp: new Date(),
            stepName,
            performanceMetrics: { duration: endTime - startTime },
            result: 'Sucess',
            error: error.message
          });
        } catch (error) {
          logs.push({
            timestamp: new Date(),
            stepName:'error in navigate to example',
            performanceMetrics: { duration: endTime - startTime },
            result: 'Failed',
            error: error.message
          });
        } finally {
          await browser.close();
          const logsFilePath = path.join(outputDir, 'execution_logs.json');
          fs.writeFileSync(logsFilePath, JSON.stringify(logs, null, 2));
          console.log(JSON.stringify(logs, null, 2));
        }
      })();
      \`\`\`
      
      Given script:
      \n${script}
      `,
              },
            ],
          },
        ],
      };

      const ai_server = process.env.AI_SERVER;
      const response = await fetch(`${ai_server}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const responseData = await response.json();

      // Extract the Puppeteer script from the response
      const puppeteerScript =
        responseData.candidates[0]?.content?.parts[0]?.text;

      if (!puppeteerScript) {
        return res
          .status(500)
          .json({ error: "Puppeteer script not found in response" });
      }

      const formattedScript = `\`\`\`javascript\n${puppeteerScript}\n\`\`\``;

      // Store the formatted script in the database
      const newGeneratedScript = new GeneratedScript({
        recordId: recordId,
        script: formattedScript,
      });

      await newGeneratedScript.save();

      // Return the newly generated script and its ID
      res.status(200).json({
        script: formattedScript,
        id: newGeneratedScript._id,
        data: newGeneratedScript,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
