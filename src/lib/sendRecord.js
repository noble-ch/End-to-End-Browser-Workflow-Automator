import axios from 'axios';

export const sendRecord = async (record, prompt) => {
  try {
    const response = await axios.post('/api/sendRecord', {
      record,
      prompt,
    });
    return response.data; 
  } catch (error) {
    console.error('Error sending record:', error.message);
    throw error; 
  }
};
