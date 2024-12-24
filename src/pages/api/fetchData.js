//pages/api/fetchData.js
// pages/api/fetchData.js
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
   
    const data = await db.collection('records').find().toArray();
    res.status(200).json(data); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
