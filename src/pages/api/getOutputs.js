import connectToDatabase from "@/lib/mongodb";
import Output from "@/models/Output";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ error: "UserId is required." });
    return;
  }

  try {
    const outputs = await Output.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ outputs });
  } catch (err) {
    console.error("Error fetching outputs:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
}
