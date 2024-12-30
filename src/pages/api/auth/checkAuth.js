import { verifyToken } from "../../../utils/verifyToken";

export default function handler(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  const decoded = verifyToken(token);
  if (decoded) {
    return res.status(200).json({ isAuthenticated: true, user: decoded });
  }

  return res.status(401).json({ isAuthenticated: false });
}
