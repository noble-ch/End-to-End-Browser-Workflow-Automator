import { schedulePuppeteerJob, getScheduledJob,editPuppeteerJob } from "@/utils/scheduler";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const { scriptId } = req.query;
    
      if (!scriptId) {
        return res.status(400).json({ error: "Missing scriptId parameter" });
      }
    
      try {
        console.log("Fetching job for scriptId:", scriptId);
    
        // Fetch the job using the scriptId
        const job = await getScheduledJob(scriptId);
    
        if (!job) {
          return res.status(404).json({ error: "Scheduled task not found" });
        }
    
        // Return the job details
        return res.status(200).json(job);
      } catch (err) {
        console.error("Error in GET /api/schedulePuppeteer:", err);
        return res.status(500).json({ error: err.message });
      }
    }
    
    case "POST": {
      const { scheduledTime, aIGeneratedCode, recordId, scriptId, recurrence } = req.body;

      if (!scheduledTime || !aIGeneratedCode || !recordId || !scriptId || !recurrence) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      try {
        await schedulePuppeteerJob(scheduledTime, aIGeneratedCode, recordId, scriptId, recurrence);
        res.status(200).json({ message: "Task scheduled successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    }

    case "PUT": {
      const { scheduledTime, aIGeneratedCode, scriptId, recurrence } = req.body;
    
      if (!scriptId || !scheduledTime || !recurrence) {
        return res.status(400).json({ error: "Missing required fields" });
      }
    
      try {
        await editPuppeteerJob(scriptId, scheduledTime, aIGeneratedCode, recurrence);
        return res.status(200).json({ message: "Task updated successfully" });
      } catch (err) {
        console.error("Error in PUT /api/schedulePuppeteer:", err);
        return res.status(500).json({ error: err.message });
      }
    }
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
