import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import connectToDatabase from '@/lib/mongodb';
import GeminiResponse from '@/models/GeminiResponse';

export const config = {
    api: {
        bodyParser: false, // Disable default body parser for file uploads
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const form = formidable({ keepExtensions: true });

    try {
        const [fields, files] = await parseForm(form, req);

        // Validate fields
        const title = fields.title?.[0];
        const description = fields.description?.[0];
        const file = files.file?.[0];
        if (!title || !description || !file) {
            return res.status(400).json({ error: 'Missing required fields or file' });
        }

        // Read and validate file data
        const fileData = fs.readFileSync(file.filepath, 'utf8');
        if (!fileData) {
            return res.status(400).json({ error: 'Uploaded file is empty' });
        }

        // Save the file locally
        const uploadDir = 'uploads';
        ensureDirectoryExists(uploadDir);
        const storedFilePath = path.join(uploadDir, `${Date.now()}_${file.originalFilename}`);
        fs.copyFileSync(file.filepath, storedFilePath);

        

        // Save the response to the database
        await connectToDatabase();
        const geminiResponse = new GeminiResponse({
            title,
            description,
            file: {
                filename: file.originalFilename,
                contentType: file.mimetype,
                path: storedFilePath,
            },
        });
        const savedItem = await geminiResponse.save();

        res.status(200).json({
            message: 'File uploaded and description saved successfully',
            data: savedItem,
        });
    } catch (error) {
        console.error('Error processing upload:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Helper function to parse form data
function parseForm(form, req) {
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve([fields, files]);
        });
    });
}

// Ensure the upload directory exists
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}



