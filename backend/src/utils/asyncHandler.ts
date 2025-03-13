import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error) => {
      logger.error(`Error: ${error.message}`);
      res.status(500).json({ error: "Internal Server Error" });
    });
  };
