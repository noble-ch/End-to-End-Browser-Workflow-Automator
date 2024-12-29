import path from "path";
import fs from "fs";

export default async function handler(req, res) {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: "Filename is required" });
  }

  const uploadsDir = path.resolve(process.cwd(), "uploads");

  // Read all files in the uploads directory
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error reading the uploads directory" });
    }

    // Find a file that ends with the requested filename
    const matchingFile = files.find((file) => file.endsWith(filename));

    if (!matchingFile) {
      return res.status(404).json({ error: "File not found" });
    }

    const filePath = path.join(uploadsDir, matchingFile);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${matchingFile}"`
    );
    res.setHeader("Content-Type", "application/javascript"); // Adjust MIME type if needed

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
}
