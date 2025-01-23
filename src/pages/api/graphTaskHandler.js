import ScheduledTask from "@/models/ScheduledTask";
export default async function handler(req, res) {
    if(req.method === "GET") {
        try {
            const tasks = await ScheduledTask.find();
            res.status(200).json(tasks);
            console.log(tasks)
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }   
}
