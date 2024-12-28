import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { generateDescription } from './generateDescription';  // Assuming generateDescription is in this file

export const config = {
    api: {
        bodyParser: false, 
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const uploadDir = path.join(process.cwd(), '/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const form = formidable({
            uploadDir,
            keepExtensions: true,
        });

        try {
           
            const [fields, files] = await form.parse(req);

           
            console.log('Fields:', fields);
            console.log('Files:', files);

            
            const filePath = files.file[0].filepath;

            const fileData = fs.readFileSync(filePath, 'utf8');
            console.log('File Data:', fileData);  // Optionally log the file content

          
            if (!fileData) {
                return res.status(400).json({ error: 'File is empty' });
            }

            
            const descriptionResponse = await generateDescription({
                fileData,  // Pass the file content
                title: fields.title[0],  // Use the title from the form field
                description: fields.description[0],  // Use the description from the form field
            });

          
            console.log('Raw Generated Description:', descriptionResponse);

            
            const generatedDescription = descriptionResponse.candidates[0]?.content || 'No description generated';

            console.log('Extracted Generated Description:', generatedDescription);  
           
            res.status(200).json({
                message: 'File uploaded and description generated successfully',
                description: generatedDescription,  
            });
        } catch (error) {
            console.error('Error processing the upload:', error.message);
            res.status(500).json({ error: 'Error processing the upload and generating description' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}


