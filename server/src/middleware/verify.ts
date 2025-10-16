
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from "../types/userTypes";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function verifyUser(req:Request, res:Response, next:NextFunction) {
    let decoded: User;
    try {
        if (!req.body.auth) {
            return res.status(400).json({msg: 'Must include auth in body'})
        }
        decoded = jwt.verify(req.body.auth, JWT_SECRET) as User;
    }
    catch(e) {
        return res.status(401).json({msg: 'invalid token provided'})
    }

    req.user = decoded;
    
    next();
}

// middleware verifies that all mandatory seller data is filled out.
export async function verifySeller(req:Request, res:Response, next:NextFunction) {
    let decoded: User;
    try {
        if (!req.body.auth) {
            return res.status(400).json({msg: 'Must include auth in body'})
        }
        decoded = jwt.verify(req.body.auth, JWT_SECRET) as User;
    }
    catch(e) {
        return res.status(401).json({msg: 'invalid token provided'})
    }

    if (!decoded.phone || !decoded.address) {
        return res.status(403).json({msg: 'missing seller information'});
    }

    req.user = decoded;
    
    next();
}