//lib/mongodb.js
import mongoose from 'mongoose';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    // If the database is already connected, skip the connection process
    return;
  }

  const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/UserUpload'; // Fallback to local DB URI if no env variable

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed');
  }
};

export default connectToDatabase;
