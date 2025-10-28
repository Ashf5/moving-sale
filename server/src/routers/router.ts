
import { Router } from "express";
import { createNewUser, loginUser, refreshToken } from "../controllers/userController";
import { verifySeller, verifyUser } from "../middleware/verify";
import { addSaleItems, createSale, getItems, getSales, getUserSale } from "../controllers/saleController";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from "url"

// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //__dirname add to join in production?
    cb(null, path.join(__dirname, "../../../client/public/uploads"));
  },
  filename: (req, file, cb) => {
    // add random name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage })

// user routes 

router.post('/users', upload.single('profile'), createNewUser);

router.post('/login', loginUser);

router.post('/refresh', refreshToken);

// sale routes
router.get('/sales/:saleId', getItems);

router.get('/sales', getSales);

router.post('/my-sale', verifySeller, getUserSale);

router.post('/sales', verifySeller, createSale);

router.post('/items', verifySeller, addSaleItems);