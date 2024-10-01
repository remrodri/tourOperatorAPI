import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "miSecretKey";

// export const generateToken = (userId: string) => {
//   return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '720h' });
// };
export const generateToken = (userId: string, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "720h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
