import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, password } = req.body;

      // Validate user input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      // Connect to the database
      await connectToDatabase();

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid email' });
      }

      // Check if password matches
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'Invalid password' });
      }

      // Generate a JWT token for the user
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,  // Make sure this is not undefined
        { expiresIn: '1h' }
      );

      // Return the token to the client
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Login failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
