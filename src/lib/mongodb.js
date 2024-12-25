
//lib/mongodb.js
// lib/mongodb.js

import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'; 
const options = {};

let client;
let clientPromise;

// Check if we are running in the server environment
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

// Export the client promise
export const connectToDatabase = global._mongoClientPromise;