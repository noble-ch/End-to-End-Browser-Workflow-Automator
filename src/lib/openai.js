
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Log the API key to check if it's correctly loaded
console.log('API Key:', process.env.API_KEY);

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.API_KEY,
  headers: {
    'Authorization': `Bearer ${process.env.API_KEY}`,
  },
});

export const generateDescription = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    
    // Log the response to see the structure
    console.log(result);

    // Adjust based on the correct property in the response
    return result.response.text; // Or adjust this line as needed

  } catch (error) {
    console.error("Error details:", error); // Log the full error object
    if (error.response?.status === 429) {
      console.error("Quota exceeded: Please check your Google Generative AI API plan.");
      throw new Error("Quota exceeded. Please try again later or check your Google Generative AI API plan.");
    }
    console.error("Google Generative AI API Error:", error.message || error);
    throw error;
  }