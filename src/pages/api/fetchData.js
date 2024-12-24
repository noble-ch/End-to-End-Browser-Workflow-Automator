<<<<<<< HEAD
//pages/api/fetchData.js
// pages/api/fetchData.js
=======
>>>>>>> e32bf1d49b3692b98b29be6ce942b82e72656f7f
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const db = await connectToDatabase();
<<<<<<< HEAD
   
    const data = await db.collection('records').find().toArray();
    res.status(200).json(data); 
=======
    // Perform operations on the database
    const data = await db.collection('WEBAUTOMATION_COLLECTION').find().toArray(); 
    res.status(200).json(data);
>>>>>>> e32bf1d49b3692b98b29be6ce942b82e72656f7f
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
