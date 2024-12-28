//api/generateDescription.js
import fs from 'fs/promises';

export async function generateDescription({ fileData, title, description }) {
  try {
    // Prepare request payload for Gemini API
    const jsonData = {
      contents: [
        {
          parts: [
            {
              text: `Given the following Puppeteer script, break it down into individual steps. Focus on providing a clear step-by-step explanation. Here is the Puppeteer script:\n\n${fileData}`,
            },
          ],
        },
      ],
    };

    // Gemini API Key (ensure it's in your environment variables)
    const apiKey = process.env.GEMINI_API_KEY;

    // Send request to Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      }
    );

    // Handle response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API Error: ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    return responseData; // Return the API response with the description
  } catch (error) {
    console.error("Error in generateDescription:", error.message);
    throw new Error("Failed to generate description");
  }
}
