import connectToDatabase from "@/lib/mongodb";
import Description from "@/models/Description";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.query; // Use `id` to match the React component's fetch call

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    await connectToDatabase();

    // Fetch the description record
    const descriptionRecord = await Description.findOne({ recordId: id });
console.log("description", descriptionRecord)
    if (!descriptionRecord) {
      return res.status(404).json({ error: "No description found for the given id" });
    }

    res.status(200).json({
      message: "Description fetched successfully",
      data: {
        generatedDescription: descriptionRecord.generatedDescription,
        createdAt: descriptionRecord.createdAt,
        updatedAt: descriptionRecord.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error in GET handler:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
