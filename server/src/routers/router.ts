
import { Router } from "express";
import { createNewUser } from "../controllers/userController";

export const router = Router();

router.post('/users', createNewUser);