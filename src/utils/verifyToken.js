import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
  } catch (err) {
    return null; // Invalid token
  }
};
