import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // development mode
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((client) => {
      console.log('Successfully connected to MongoDB'); 
      return client;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  //  production
  clientPromise = MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => {
    console.log('Successfully connected to MongoDB'); 
    return client;
  });
}

export default clientPromise;
