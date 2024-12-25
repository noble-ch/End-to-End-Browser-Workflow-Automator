import path from 'path';
import { promises as fs } from 'fs';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import GeminiResponse from '@/models/GeminiResponse';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase;
      if (mongoose.connection.readyState === 0) {
        mongoose.connect('mongodb://localhost:27017/testautomation');
        console.log('Connected to MongoDB');
      }

      // Load the test_puppeteer.js file from the public folder
      const filePath = path.join(process.cwd(), 'public', 'testalx.js');
      const fileData = await fs.readFile(filePath, 'utf8');

      // Prepare the request payload for the Gemini API
      const jsonData = {
        contents: [
          {
            parts: [
              {
                text: `Given the following Puppeteer script, break it down into the individual steps. Focus on providing a clear step-by-step explanation, numbered from 1 to n. Do not include any introductory text or context, just the breakdown of each step in the process of automation. Here is the Puppeteer script:\n\n${fileData}`
              }
            ]
          }
        ]
      };

      // Make a POST request to the Gemini API
      const apiKey = process.env.GEMINI_API_KEY; 
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from Gemini API:', errorData);
        return res.status(500).json({ error: errorData });
      }

      const responseData = await response.json();

      // Save response to the database
      const geminiResponse = new GeminiResponse({
        response: JSON.stringify(responseData, null, 2),
      });

      await geminiResponse.save();

      res.status(200).json(responseData);
      const savedResponse = await geminiResponse.save();
      console.log('Saved Response:', savedResponse);

    } catch (error) {
      console.error('Error in API handler:', error.message);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
