import { cancelPuppeteerJob } from "@/utils/scheduler";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { scriptId } = req.body;

    if (!scriptId) {
      return res.status(400).json({ error: "Missing scriptId" });
    }

    try {
      const canceled = await cancelPuppeteerJob(scriptId);
      if (canceled) {
        return res.status(200).json({ message: "Task stopped successfully" });
      } else {
        return res.status(404).json({ error: "Task not found" });
      }
    } catch (err) {
      console.error("Error canceling task:", err);
      return res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
