import connectDb from "@/lib/mongodb"; // Your MongoDB connection utility
import Description from "@/models/Description"; // Your model

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDb(); // Ensure the DB is connected

      const { id, updatedDescription } = req.body; // Extract both `id` and `updatedDescription`
      console.log("id", id);
      console.log("des", updatedDescription);

      // Validate input
      if (!id || !updatedDescription) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Check if the description record exists
      const existingDescription = await Description.findOne({ recordId: id });

      if (!existingDescription) {
        return res.status(404).json({ error: 'Description not found' });
      }

      // Update the description in the database
      existingDescription.generatedDescription = updatedDescription.join("\n"); // Save the updated description as a string with new lines
      await existingDescription.save();
console.log("ex", existingDescription);
      return res.status(200).json({ message: 'Description updated successfully' });
    } catch (err) {
      console.error('Error updating description:', err);
      return res.status(500).json({ error: 'An error occurred while updating the description' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

