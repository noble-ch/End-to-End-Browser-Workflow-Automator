import jwt from 'jsonwebtoken';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Extract token
      if (!token) {
        return res.status(401).json({ error: 'Token is required' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      await connectToDatabase();

      const user = await User.findById(decoded.userId).select('-password'); // Fetch user
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ username: user.firstname + " " + user.lastname, email: user.email });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user information' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
