//handler
import { generateDescription } from "./generateDescription";
import connectToDatabase from "@/lib/mongodb";
import Description from "@/models/Description";
import Task from "@/models/Task";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Assuming the request body is a JSON object
      const { recordId } = req.body; // Destructure to get the recordId
      console.log("recordId", recordId);

      await connectToDatabase();
      // Fetch the record from the database
      const record = await Task.findById(recordId);

      if (!record) {
        return res.status(404).json({ error: "Record not found" });
      }
      const fileContent = record?.file?.content;
      const descriptionResponse = await generateDescription({
        fileContent,
      });

      const generatedDescriptionParts =
        descriptionResponse.candidates[0]?.content?.parts || [];
      const generatedDescription = generatedDescriptionParts
        .map((part) => part.text)
        .join("\n");

      const newDescription = new Description({
        generatedDescription,
        recordId, // You can save the file path or URL
      });

      await newDescription.save();
      res.status(200).json({
        recordId,
        generatedDescription,
      });
      console.log("saved successfully");
    } catch (error) {
      console.error("Error fetching record:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
