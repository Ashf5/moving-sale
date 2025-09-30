
import { Router } from "express";
import { createNewUser, loginUser } from "../controllers/userController";

export const router = Router();

router.post('/users', createNewUser);

router.post('/login', loginUser);