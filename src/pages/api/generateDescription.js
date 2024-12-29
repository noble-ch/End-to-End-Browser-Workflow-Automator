//api/generateDescription.js
import fs from 'fs/promises';

export async function generateDescription({ fileData }) {
  try {
    // Prepare request payload for Gemini API
    const jsonData = {
      contents: [
        {
          parts: [
            {
              text: `Given the following Puppeteer script, break it down into individual steps. Focus on providing a clear and concise step-by-step explanation. Here is the Puppeteer script:\n\n${fileData}\n\nThe description should be structured as follows:\n1. Import Puppeteer library.\n2. Launch a new browser instance.\n3. Create a new page.\n4. Set default timeout and viewport size.\n5. Navigate to the specified URL.\n6. Perform actions like locating elements, filling inputs, or simulating interactions.\n7. Log success messages or handle errors.\n8. Close the browser.\n\nEnsure the explanation focuses only on essential details.`
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
    return responseData; // Return the API response with the generated description
  } catch (error) {
    console.error("Error in generateDescription:", error.message);
    throw new Error("Failed to generate description");
  }
}
