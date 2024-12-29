// api/userUploads.js
import connectToDatabase from '@/lib/mongodb';
import GeminiResponse from '@/models/GeminiResponse';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            console.log('Handler started');

            // Connect to MongoDB
            await connectToDatabase();
            console.log('Connected to MongoDB');

            // Get the data from the request body
            const { title, description, filePath, generatedDescription } = req.body;

            console.log('Received data:', { title, description, filePath, generatedDescription });

            // Ensure all required fields are provided
            if (!title || !description || !filePath || !generatedDescription) {
                console.error('Missing required fields:', { title, description, filePath, generatedDescription });
                return res.status(400).json({ error: 'Missing required fields' });
            }

            // Create a new GeminiResponse document
            const geminiResponse = new GeminiResponse({
                title,
                description,
                filePath,
                generatedDescription,
            });

            // Save the data in MongoDB
            const savedItem = await geminiResponse.save();
            console.log('Saved item:', savedItem);

            return res.status(200).json({
                message: 'Data successfully saved to the database',
                savedItem,
            });
        } catch (error) {
            console.error('Error in handler:', error.message);
            return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}



