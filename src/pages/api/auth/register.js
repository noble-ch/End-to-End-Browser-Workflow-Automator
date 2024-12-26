import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('Registration request:', req.body);

      const { firstName, lastName, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
      }

      await connectToDatabase();

      // Check if the email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const user = new User({
        firstname: firstName, 
        lastname: lastName,
        email,
        password: hashedPassword,
      });
      await user.save();

      console.log('User registered successfully:', user);
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
