import { exec } from "child_process";
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { script } = req.body;

  if (!script) {
    res.status(400).json({ error: "No script provided." });
    return;
  }

  // Remove backticks and language tags (e.g., ```javascript)
  const sanitizedScript = script.replace(/```[a-zA-Z]*\n?/g, "").trim();

  const tempFilePath = path.join(process.cwd(), "tempPuppeteerScript.js");

  try {
    // Write sanitized script to a temporary file
    fs.writeFileSync(tempFilePath, sanitizedScript);

    // Execute the script using Node.js
    exec(
      `node ${tempFilePath}`,
      { timeout: 10000 },
      (error, stdout, stderr) => {
        // Clean up the temporary file
        fs.unlinkSync(tempFilePath);

        if (error) {
          console.error("Execution error:", stderr || error.message);
          res.status(500).json({ error: stderr || error.message });
          return;
        }

        res.status(200).json({ output: stdout });
      }
    );
  } catch (err) {
    console.error("File handling error:", err.message);
    res.status(500).json({
      error: "Internal server error. Could not handle the script file.",
    });
  }
}
