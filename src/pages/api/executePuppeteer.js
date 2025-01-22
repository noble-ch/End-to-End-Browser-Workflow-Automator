import { exec } from "child_process";
import fs from "fs";
import path from "path";
import ExecutionOutput from "@/models/Output";
import GeneratedScript from "@/models/GeneratedScript";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { recordId, scriptId, script } = req.body;

  if (!script || !recordId || !scriptId) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const runId = Date.now(); // Unique identifier for this execution
  const outputDir = path.join(
    process.cwd(),
    `public/output/${recordId}/${runId}/`
  );
  fs.mkdirSync(outputDir, { recursive: true }); // Ensure output directory exists

  const sanitizedScript = script
    .replace(/```[a-zA-Z]*\n?/g, "") // Remove code block markers
    .replace(
      /const\s+recordId\s*=\s*'[^']*';/,
      `const recordId = '${recordId}';`
    )
    .replace(/const\s+runId\s*=\s*'[^']*';/, `const runId = '${runId}';`)
    .replace(
      /const\s+outputDir\s*=\s*path\.join\(__dirname,\s*'[^']*'\);/,
      `const outputDir = path.join(__dirname, '${outputDir}');`
    )
    .trim();

  const tempFilePath = path.join(process.cwd(), "tempPuppeteerScript.js");

  let screenshots = []; // Initialize screenshots array
  let logs = []; // Initialize logs array

  try {
    fs.writeFileSync(tempFilePath, sanitizedScript);

    exec(
      `node ${tempFilePath}`,
      { timeout: 60000 },
      async (error, stdout, stderr) => {
        fs.unlinkSync(tempFilePath); 

        try {
          screenshots = fs
            .readdirSync(outputDir)
            .filter((file) => file.endsWith(".png"))
            .map((file) => ({
              path: path.join("/output", recordId, runId.toString(), file), // Save relative path
              timestamp: new Date(),
            }));
        } catch (fsError) {
          console.error("Error reading screenshots:", fsError.message);
        }

        // Process logs
        const logOutput = stdout || stderr;
        if (logOutput) {
          logs.push({ timestamp: new Date(), content: logOutput });
        }

        // Save logs to database regardless of success or failure
        const status = error ? "failed" : "completed";
        const errorMessage = error ? stderr || error.message : null;

        try {
          await ExecutionOutput.create({
            recordId,
            scriptId,
            runId,
            status,
            error: errorMessage,
            screenshots,
            logs: JSON.stringify(logs), // Save logs as a string
          });
        } catch (dbError) {
          console.error(
            "Error saving execution logs to database:",
            dbError.message
          );
        }

        if (error) {
          console.error("Execution error:", stderr || error.message);

          // Remove the script from the generated script database
          try {
            await GeneratedScript.deleteOne({ _id: scriptId });
            console.log(`Script with ID ${scriptId} removed from database.`);
          } catch (dbError) {
            console.error(
              "Error removing script from database:",
              dbError.message
            );
          }

          return res.status(200).json({
            error: stderr || error.message,
            screenshots, // Return partial screenshots in the response
            logs, // Return logs for debugging
          });
        }

        res
          .status(200)
          .json({ message: "Execution completed", screenshots, logs });
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
