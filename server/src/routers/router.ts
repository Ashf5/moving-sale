
import { Router } from "express";
import { createNewUser, loginUser, refreshToken } from "../controllers/userController";
import { verifySeller, verifyUser } from "../middleware/verify";
import { createSale } from "../controllers/saleController";

export const router = Router();

// user routes 

router.post('/users', createNewUser);

router.post('/login', loginUser);

router.post('/refresh', refreshToken);

// sale routes

router.post('/sales', verifySeller, createSale);