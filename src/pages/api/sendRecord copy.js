//api/sendRecord%20copy.js
import formidable from 'formidable';
import fs from 'fs';
import connectToDatabase from '@/lib/mongodb';
import GeminiResponse from '@/models/GeminiResponse';
import { generateDescription } from './generateDescription';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const form = formidable({
            keepExtensions: true,
        });

        try {
            // Parse the form data
            const [fields, files] = await form.parse(req);

            console.log('Fields:', fields);
            console.log('Files:', files);

            // Extract the necessary fields and file data
            const title = fields.title[0];
            const description = fields.description[0];
            const file = files.file[0];  // The uploaded file

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

            console.log('Raw Generated Description:', descriptionResponse);

            // Extract and convert the description to a string
            const generatedDescriptionParts = descriptionResponse.candidates[0]?.content?.parts || [];
            const generatedDescription = generatedDescriptionParts.map(part => part.text).join('\n');

            console.log('Extracted Generated Description:', generatedDescription);

            // Connect to the database
            await connectToDatabase();

            // Create the response object for MongoDB
            const geminiResponse = new GeminiResponse({
                title,
                description,
                file: {
                    filename: file.originalFilename,  // Store the file's name
                    contentType: file.mimetype,  // Store the file's MIME type
                    data: fileData,  // Store the file's binary data
                },
                generatedDescription: generatedDescription,  // Store the generated description
                response: generatedDescription,  // Store the same description in response or modify as needed
            });

            // Save the data to MongoDB
            const savedItem = await geminiResponse.save();
            console.log('Saved Item:', savedItem);

            // Respond with success
            res.status(200).json({
                message: 'File uploaded and description generated successfully',
                data: savedItem,
            });
        } catch (error) {
            console.error('Error processing the upload:', error.message);
            res.status(500).json({ error: 'Error processing the upload and generating description' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}



