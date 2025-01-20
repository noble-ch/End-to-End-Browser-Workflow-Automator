import { schedulePuppeteerJob } from "@/utils/scheduler";
import connectToDatabase from "@/lib/mongodb"; // MongoDB connection
import ScheduledTask from "@/models/ScheduledTask"; // MongoDB model for scheduled tasks

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { scheduledTime, aIGeneratedCode, recordId } = req.body;

    if (!scheduledTime || !aIGeneratedCode || !recordId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Step 1: Connect to the database
      await connectToDatabase();

      // Step 2: Create a new scheduled task document
      const newScheduledTask = new ScheduledTask({
        scheduledTime: new Date(scheduledTime), // Convert string to Date object
        aIGeneratedCode,
        recordId
      });

      // Step 3: Save the new scheduled task to the database
      await newScheduledTask.save();

      // Step 4: Schedule the Puppeteer job
      await schedulePuppeteerJob(scheduledTime, aIGeneratedCode, recordId);

      res.status(200).json({ message: "Task scheduled successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

