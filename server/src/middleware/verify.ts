
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function verifyUser(req:Request, res:Response, next:NextFunction) {
    let decoded: jwt.JwtPayload | string;
    try {
        if (!req.body.auth) {
            return res.status(400).json({msg: 'Must include auth in body'})
        }
        decoded = jwt.verify(req.body.auth, JWT_SECRET);
    }
    catch(e) {
        return res.status(401).json({msg: 'invalid token provided'})
    }

    req.user = decoded;
    
    next();
}