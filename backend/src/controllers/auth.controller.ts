import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import bcryptjs from "bcryptjs";
import prisma from "../config/prisma";
import { generateToken } from "../utils/generateToken";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  let { username, fullname, password, gender } = req.body;

  // Trim input values
  username = username?.trim().toLowerCase();
  fullname = fullname?.trim();

  // Validate required fields
  if (!username || !fullname || !gender || !password) {
    res.status(400).json({ error: "Missing input data" });
    return;
  }

  // Check if username already exists
  const existingUser = await prisma.user.findUnique({ where: { username } });

  if (existingUser) {
    res.status(409).json({ error: "Username is already taken" });
    return;
  }

  // Hash password
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // Generate profile picture based on gender
  const genderType = gender === "MALE" ? "boy" : "girl";
  const profilePic = `https://avatar.iran.liara.run/public/${genderType}?username=${username}`;

  // Create new user
  const newUser = await prisma.user.create({
    data: {
      username,
      fullname,
      password: hashedPassword,
      gender,
      profilePic,
    },
  });

  // generate token
  generateToken(newUser.id, res);

  res.status(201).json({
    message: "User signed up successfully",
    data: {
      id: newUser.id,
      username: newUser.username,
      fullname: newUser.fullname,
      gender: newUser.gender,
      profilePic: newUser.profilePic,
    },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  let { username, password } = req.body;

  // Trim username
  username = username?.trim().toLowerCase();

  // Validate required fields
  if (!username || !password) {
    res.status(400).json({ error: "Missing input data" });
    return;
  }

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const isPasswordCorrect = await bcryptjs.compare(password, user.password);

  if (!isPasswordCorrect) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  // generate token
  generateToken(user.id, res);

  res.status(201).json({
    message: "User logged in successfully",
    data: {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      gender: user.gender,
      profilePic: user.profilePic,
    },
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(201).json({
    message: "User logged out successfully",
  });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res
    .status(200)
    .json({ message: "User data fetched successfully", data: req.user });
});
