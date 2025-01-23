import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ error: "Token is required." });
      }

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { email, name, picture } = payload;

      await connectToDatabase();

      // Check if user exists or create new user
      let user = await User.findOne({ email });
      if (!user) {
        user = new User({
          firstname: name.split(" ")[0],
          lastname: name.split(" ").slice(1).join(" "),
          email,
          googlePicture: picture,
          password: null, 
        });
        await user.save();
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

      res.status(200).json({ accessToken, refreshToken, user });
    } catch (error) {
      console.error("Error during Google OAuth:", error);
      res.status(500).json({ error: "Google authentication failed." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
