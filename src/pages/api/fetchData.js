//pages/api/fetchData.js
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();

    // Fetch data from both collections
    const recordsData = await db.collection('records').find().toArray();
    const webAutomationData = await db.collection('WEBAUTOMATION_COLLECTION').find().toArray();

    // Combine the data or send them separately
    res.status(200).json({ records: recordsData, webAutomation: webAutomationData }); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}

