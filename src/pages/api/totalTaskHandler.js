import ScheduledTask from "@/models/ScheduledTask";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Fetch all tasks from the database
      const tasks = await ScheduledTask.find();

      // Calculate total and completed task counts
      const total = tasks.length;
      const completed = tasks.filter(task => task.status === "completed").length;

      // Return the counts in the desired format
      res.status(200).json({ total, completed });
      console.log({ total, completed }); // Optional: Log the result for debugging
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
