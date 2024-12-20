import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateDescription = async (inputText) => {
  const response = await openai.completions.create({
    model: '',
    prompt: inputText,
    max_tokens: 100,
  });
  return response.choices[0].text.trim();
};
