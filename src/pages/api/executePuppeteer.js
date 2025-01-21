import { exec } from "child_process";
import fs from "fs";
import path from "path";
import ExecutionOutput from "@/models/Output";
import GeneratedScript from "@/models/GeneratedScript";
import ExecutionOutput from "@/models/Output"; // Ensure model paths are correct
import GeneratedScript from "@/models/GeneratedScript"; // Ensure model paths are correct

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { recordId, scriptId} = req.body;
  const scriptObject = await GeneratedScript.findById(scriptId);
  const script = scriptObject?.script;
  // console.log("executePuppeteer",script);
  if (!script || !recordId || !scriptId) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const runId = Date.now(); // Unique identifier for this execution
  const outputDir = path.join(process.cwd(), `output/${recordId}/${runId}/`);
  fs.mkdirSync(outputDir, { recursive: true }); // Ensure output directory exists

  // Replace placeholders for `recordId`, `runId`, and `outputDir` in the script
  const sanitizedScript = script
    .replace(/```[a-zA-Z]*\n?/g, "") // Remove code block markers
    .replace(
      /const\s+recordId\s*=\s*'[^']*';/,
      `const recordId = '${recordId}';`
    )
    .replace(
      /const\s+runId\s*=\s*'[^']*';/,
      `const runId = '${runId}';`
    )
    .replace(
      /const\s+outputDir\s*=\s*path\.join\(__dirname,\s*'[^']*'\);/,
      `const outputDir = path.join(__dirname, '${outputDir}');`
    )
    .trim();

  const tempFilePath = path.join(process.cwd(), "tempPuppeteerScript.js");

  try {
    // Write the sanitized script to a temporary file
    fs.writeFileSync(tempFilePath, sanitizedScript);

    exec(
      `node ${tempFilePath}`,
      { timeout: 120000 }, // Set a timeout for Puppeteer tasks
      async (error, stdout, stderr) => {
        fs.unlinkSync(tempFilePath); // Clean up temp file after execution

        if (error) {
          console.error("Execution error:", stderr || error.message);
          await ExecutionOutput.create({
            recordId,
            scriptId,
            runId,
            status: "failed",
            error: stderr || error.message,
          });
          return res.status(500).json({ error: stderr || error.message });
        }

        // Collect screenshots from the output directory
        const screenshots = fs
          .readdirSync(outputDir)
          .filter((file) => file.endsWith(".png"))
          .map((file) => ({
            path: path.join(outputDir, file),
            timestamp: new Date(),
          }));

        // Save execution details to the database
        await ExecutionOutput.create({
          recordId,
          scriptId,
          runId,
          status: "completed",
          outputPath: outputDir,
          screenshots,
        });

        res.status(200).json({ message: "Execution completed", screenshots });
      }
    );
  } catch (err) {
    console.error("File handling error:", err.message);
    try {
      // Save error logs to the database
      await ExecutionOutput.create({
        recordId,
        scriptId,
        runId,
        status: "failed",
        error: err.message,
        screenshots,
        logs: JSON.stringify(logs),
      });
    } catch (dbError) {
      console.error("Error saving file handling error logs:", dbError.message);
    }
    res.status(500).json({ error: "Internal server error" });
  }
}
