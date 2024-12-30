//handler
import formidable from 'formidable';
import fs from 'fs';
import { generateDescription } from './generateDescription';
import connectToDatabase from '@/lib/mongodb';// Import the connectToDatabase function
import Description from '@/models/Description'; // Import the Description model

export const config = {
    api: {
        bodyParser: false, // Disable body parsing, so formidable can parse the form data
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = formidable({
            keepExtensions: true, // Keep file extensions
        });

        try {
            // Parse the form data
            const [fields, files] = await form.parse(req);

            // Extract the necessary fields and file data
            const title = fields.title[0];  // Assuming title is part of the form fields
            const description = fields.description[0]; // Assuming description is part of the form fields
            const file = files.file[0]; // The uploaded file

            if (!file) {
                return res.status(400).json({ error: 'No file provided' });
            }

            // Read the file as binary data
            const fileData = fs.readFileSync(file.filepath);

            if (!fileData) {
                return res.status(400).json({ error: 'File is empty' });
            }

            // Generate the description for the uploaded file
            const descriptionResponse = await generateDescription({
                fileData,
                title,
                description,
            });

            // Extract and format the generated description
            const generatedDescriptionParts = descriptionResponse.candidates[0]?.content?.parts || [];
            const generatedDescription = generatedDescriptionParts.map(part => part.text).join('\n');

            // Respond with the generated description
            console.log(generatedDescription);

            // Save the generated description in the database
            await connectToDatabase(); // Ensure the database is connected

            const newDescription = new Description({
                generatedDescription,
                title,
            description, // Assuming description is part of the form fields
                file,
            });

            await newDescription.save(); // Save the generated description to the database

            res.status(200).json({
                message: 'Description generated and saved successfully',
                generatedDescription,
            });
        } catch (error) {
            console.error('Error processing the upload:', error.message);
            res.status(500).json({ error: 'Error processing the upload and generating description' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

