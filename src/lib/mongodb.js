//lib/mongodb.js
// lib/mongodb.js
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

let dbConnection;

const connectToDatabase = async () => {
  try {
    if (!dbConnection) {
      await client.connect();
      dbConnection = client.db('WEBAUTOMATION'); // Replace with your DB name
      console.log('Connected to MongoDB on port 27017');
    }
    return dbConnection;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
};

export { connectToDatabase };
