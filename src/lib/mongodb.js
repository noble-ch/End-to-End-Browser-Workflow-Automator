
//lib/mongodb.js
// lib/mongodb.js

import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; 
const options = {};

let client;
let clientPromise;

<<<<<<< HEAD
// Check if we are running in the server environment
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
=======
const connectToDatabase = async () => {
  try {
    if (!dbConnection) {
      await client.connect();
      dbConnection = client.db('WEBAUTOMATION'); // Replace with your DB name
      dbConnection = client.db('WEBAUTOMATION'); 

      console.log('Connected to MongoDB on port 27017');
    }
    return dbConnection;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
};
>>>>>>> 570d0c4246de985325b89680b25e60c3bbd869fd

// Export the client promise
export const connectToDatabase = global._mongoClientPromise;