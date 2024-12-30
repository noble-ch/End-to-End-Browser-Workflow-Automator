//handler
import formidable from 'formidable';
import fs from 'fs';
import { generateDescription } from './generateDescription';
import connectToDatabase from '@/lib/mongodb';
import Description from '@/models/Description';
import jwt from 'jsonwebtoken';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file handling
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Parse form data (fields and files)
      const [fields, files] = await form.parse(req);

      const title = fields.title[0]; // Form field
      const description = fields.description[0]; // Form field
      const file = files.file[0]; // The uploaded file

      if (!file) {
        return res.status(400).json({ error: 'No file provided' });
      }

      const fileData = fs.readFileSync(file.filepath);
      if (!fileData) {
        return res.status(400).json({ error: 'File is empty' });
      }

      // Generate description based on file data
      const descriptionResponse = await generateDescription({
        fileData,
        title,
        description,
        user: user.userId,
      });

      const generatedDescriptionParts = descriptionResponse.candidates[0]?.content?.parts || [];
      const generatedDescription = generatedDescriptionParts.map((part) => part.text).join('\n');

      // Connect to database and save the description
      await connectToDatabase();

      const newDescription = new Description({
        generatedDescription,
        title,
        description,
        file: file.filepath, // You can save the file path or URL
        user: user.userId,
      });

      await newDescription.save();

      res.status(200).json({
        message: 'Description generated and saved successfully',
        generatedDescription,
        data: {
          _id: newDescription._id,
        },
      });
    } catch (error) {
      console.error('Error processing the upload:', error.message);
      res.status(500).json({ error: 'Error processing the upload and generating description' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

