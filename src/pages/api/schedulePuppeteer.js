import { schedulePuppeteerJob, getScheduledJob, updateScheduledJob } from "@/utils/scheduler"; 


export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const { scriptId } = req.query;
      if (!scriptId) {
        return res.status(400).json({ error: "Missing scriptId parameter" });
      }

      try {
        const job = await getScheduledJob(scriptId); // Fetch job details
        if (!job) {
          return res.status(404).json({ error: "Scheduled task not found" });
        }
        res.status(200).json(job);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
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
      const { scheduledTime, aIGeneratedCode, recordId, scriptId, recurrence } = req.body;

      if (!scriptId || !scheduledTime || !recurrence) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      try {
        await updateScheduledJob(scriptId, { scheduledTime, aIGeneratedCode, recordId, recurrence });
        res.status(200).json({ message: "Task updated successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
      break;
    }

    default: {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
}



