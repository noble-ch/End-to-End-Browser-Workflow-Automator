//api/generateDescription.js
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
              Please use the below wtiting style to show each steps as an example:
                  1. search for example.com  \n 
                  2. opens example.com \n 
                  3. submits the data 
              follow teh rules also :
                  1. do not write the pasword directly instead write with enters required pasword
                  2. do not write the email directly instead write with enters required email
                  
              
              Keep it do not include technical stuf like setup viewport or other things like code simple and clear so anyone can understand what’s happening in each step. do not insert introductory words or unecessary description Thanks!
              `,
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
