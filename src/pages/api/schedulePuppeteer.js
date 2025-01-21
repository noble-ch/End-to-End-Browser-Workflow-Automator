// api/schedulePuppeteer.js
import { schedulePuppeteerJob } from "@/utils/scheduler"; // Utility function to handle scheduling

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { scheduledTime, aIGeneratedCode, recordId, scriptId } = req.body;
    if (!scheduledTime || !aIGeneratedCode || !recordId || !scriptId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Schedule the task with the provided data
      await schedulePuppeteerJob(scheduledTime, aIGeneratedCode, recordId, scriptId);

      res.status(200).json({ message: "Task scheduled successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
