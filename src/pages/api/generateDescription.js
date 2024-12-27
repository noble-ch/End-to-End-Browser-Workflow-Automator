export async function generateDescription(file, title, description) {
  try {
    const fileData = await fs.readFile(file.filepath, 'utf8');  // Read the uploaded file

    const jsonData = {
      contents: [
        {
          parts: [
            {
              text: `Given the following Puppeteer script, break it down into the individual steps. Focus on providing a clear step-by-step explanation. Here is the Puppeteer script:\n\n${fileData}`
            }
          ]
        }
      ]
    };

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API Error: ${JSON.stringify(errorData)}`);
    }

    const responseData = await response.json();
    return responseData;  // Return the Gemini API response

  } catch (error) {
    console.error('Error in generateDescription:', error.message);
    throw new Error('Failed to generate description');
  }
}
