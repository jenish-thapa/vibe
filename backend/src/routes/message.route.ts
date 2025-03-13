import express from "express";
import { signup } from "../controllers/auth.controller";

const router = express.Router();

router.route("/signup").post(signup);

export default router;
