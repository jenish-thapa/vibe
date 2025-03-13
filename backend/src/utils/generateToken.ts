import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: String, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS cross site scripting
    sameSite: "strict", // CSRF attack cross-site req forgery
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
