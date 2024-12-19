import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
    // Perform operations on the database
    const data = await db.collection('WEBAUTOMATION_COLLECTION').find().toArray(); 
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
