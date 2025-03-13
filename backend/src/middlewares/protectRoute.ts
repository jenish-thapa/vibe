import { NextFunction, Request, Response } from "express";
import prisma from "../config/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
        username: string;
        fullname: string;
        gender: string;
        profilePic: string;
      };
    }
  }
}

export const protectRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.jwt;
    if (!token) {
      res.status(401).json({ error: "Unauthorized - No token provided" });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedToken;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          username: true,
          fullname: true,
          gender: true,
          profilePic: true,
        },
      });

      if (!user) {
        res.status(404).json({ error: "Unauthorized - User not found" });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res
        .status(401)
        .json({ error: "Unauthorized - Invalid or expired token" });
    }
  }
);
