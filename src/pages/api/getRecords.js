// pages/api/getRecords.js
import connectToDatabase from '@/lib/mongodb'; // MongoDB connection
import GeminiResponse from '@/models/GeminiResponse'; // Import your model
import jwt from 'jsonwebtoken'; // JWT library

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const token = req.headers.authorization?.split(' ')[1]; // Get the token from headers
        if (!token) {
            return res.status(401).json({ error: 'Token is required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);  // Log the decoded token to see if it contains the correct userId
        
        await connectToDatabase();

        // Fetch the records specific to the authenticated user
        const records = await GeminiResponse.find({ userId: decoded.userId });
        console.log(records);  // Log the records to see if any are returned


        if (!records || records.length === 0) {
            return res.status(404).json({ error: 'No records found for this user' });
        }

        // Send the records as a response
        res.status(200).json({
            message: 'Records fetched successfully',
            data: records,
        });
    } catch (error) {
        console.error('Error fetching records:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
