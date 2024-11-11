import express, { NextFunction, Request, Response } from "express";
import { signUp } from "../controllers/user/sign-up.js";
import { signIn } from "../controllers/user/sign-in.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);


export default router;
