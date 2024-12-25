export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const authHeader = req.headers.authorization;
      console.log('Authorization Header:', authHeader);

      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
      }

      const token = authHeader.split(' ')[1]; // Extract token
      console.log('Extracted Token:', token);

      if (!token) {
        return res.status(401).json({ error: 'Token missing' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user by ID
      const user = await User.findById(decoded.userId).select('-password'); // Exclude password
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error('Error during user fetch:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
