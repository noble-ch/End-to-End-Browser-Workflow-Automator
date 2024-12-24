import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  console.log('Request method:', req.method);

  if (req.method === 'POST') {
    try {
      const filePath = path.join(process.cwd(), 'public', 'test.json');
      const fileData = await fs.readFile(filePath, 'utf8');
      const interactions = JSON.parse(fileData);

      const jsonData = {
        contents: [
          {
            parts: [
              {
                text: `Given the following JSON interaction data...` 
              }
            ]
          }
        ]
      };

      const apiKey = 'YOUR_API_KEY';
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jsonData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from Gemini API:', errorData);
        return res.status(500).json({ error: errorData });
      }

      const responseData = await response.json();
      return res.status(200).json(responseData);
    } catch (error) {
      console.error('Error in API handler:', error);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    console.error('Invalid method:', req.method);
    return res.status(405).json({ error: `Method ${req.method} is not allowed.` });
  }
}
