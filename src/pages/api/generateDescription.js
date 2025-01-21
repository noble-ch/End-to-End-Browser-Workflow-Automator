//api/generateDescription.js
import fs from "fs/promises";
import fs from "fs/promises";

export async function generateDescription({ fileContent }) {
  try {
    // Prepare request payload for Gemini API
    const jsonData = {
      contents: [
        {
          parts: [
            {
              text: `Here’s a step-by-step a Puppeteer script. We’ll go through what each part does . The script looks like this:
              ${fileContent}
              
              Please explain it in the following way:
              
              1. **Start by using Puppeteer**: The script begins by using Puppeteer to control the browser.
              2. **Open a browser**: A new browser session is started to interact with the web.
              3. **Open a new page**: A blank page is opened within the browser for the script to work on.
              4. **Set up the page**: The script sets things up like the page's size and how long to wait for actions to complete.
              5. **Go to a website**: The script navigates to a specific webpage to perform actions on it.
              6. **Do actions**: The script interacts with the page by finding buttons, filling in forms, or clicking on elements.
              7. **Check for errors**: If everything works, a success message is shown, or if there’s an error, it is handled properly.
              8. **Close the browser**: Once everything is done, the browser is closed.
              
              Keep it simple and clear so anyone can understand what’s happening in each step. Thanks!
              `
            },
          ],
        },
      ],
    };

    // Gemini API Key (ensure it's in your environment variables)
    const AI_SERVER = process.env.AI_SERVER;

    // Send request to Gemini API
    const response = await fetch(`${AI_SERVER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

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
