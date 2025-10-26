
import { Router } from "express";
import { createNewUser, loginUser, refreshToken } from "../controllers/userController";
import { verifySeller, verifyUser } from "../middleware/verify";
import { addSaleItems, createSale, getItems, getSales, getUserSale } from "../controllers/saleController";

export const router = Router();

// user routes 

router.post('/users', createNewUser);

router.post('/login', loginUser);

router.post('/refresh', refreshToken);

// sale routes
router.get('/sales/:saleId', getItems);

router.get('/sales', getSales);

router.post('/my-sale', verifySeller, getUserSale);

router.post('/sales', verifySeller, createSale);

router.post('/items', verifySeller, addSaleItems);