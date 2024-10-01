import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../../utils/jwt";

export interface AuthenticateRequest extends Request {
  userId?: string;
}

export const authMiddleware = (req: AuthenticateRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token) as { user: string };
    req.userId = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
