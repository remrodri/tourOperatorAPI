import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../../utils/jwt";
import { HttpException } from "./HttpException";

// export interface AuthenticateRequest extends Request {
//   userId?: string;
// }

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, "Autentication token missing");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new HttpException(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
  }
  // const token = req.headers.authorization?.split(" ")[1];
  // if (!token) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }

  // try {
  //   const decoded = verifyToken(token) as { user: string };
  //   req.userId = decoded.user;
  //   next();
  // } catch (error) {
  //   return res.status(401).json({ error: "Unauthorized" });
  // }
};
