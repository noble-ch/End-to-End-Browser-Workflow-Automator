import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      await connectToDatabase();

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid email or password." });
      }

      // Generate tokens
      const accessToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Login failed. Please try again." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

