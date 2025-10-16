
import { Router } from "express";
import { createNewUser, loginUser, refreshToken } from "../controllers/userController";
import { verifyUser } from "../middleware/verify";

export const router = Router();

router.post('/users', createNewUser);

router.post('/login', loginUser);

router.post('/refresh', refreshToken);