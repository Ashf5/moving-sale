
import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyUserData } from "../helpers/verifyData";
import { User } from "../types/userTypes";
import { createNewUserDB, getUserByEmailDB } from "../models/userModel";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;


// creates new user, sets refresh token cookie and returns an access token
export async function createNewUser(req:Request, res:Response) {
    const {firstname, lastname, password, email, phone, address} = req.body;
    
    let user: User;
    try {
        user = await verifyUserData(firstname, lastname, password, email, phone, address);
    }
    catch(e) {
        return res.status(400).json({msg: 'Invalid data received.'})
    }

    let createdUser: User;
    try {
        createdUser = await createNewUserDB(user);
    }
    catch(e) {
        return res.status(500).json({msg: 'Error while creating new user.'})
    }

    const tokens = createTokens(createdUser);

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(201).json({accessToken: tokens.accessToken});
}



// logs in users, accepts email and password, if verifies properly, sets a refresh token cookie and returns an access token.
export async function loginUser(req: Request, res: Response) {
    const {email, password} = req.body;

    let user: User | undefined;

    try {
        user = await getUserByEmailDB(email);
        if (!user) {
            return res.status(404).json({msg: 'user not found'})
        }
    }
    catch (e) {
        return res.status(500).json({msg: 'error fetching user'});
    }

    const isMatch = await compare(password, user.password || '');
    if (!isMatch) {
        return res.status(403).json({msg: 'incorrect password'})
    }

    // user clone minus the password key
    const minusPassword: User = {id: user.id, firstname: user.firstname,lastname: user.lastname, email: user.email, address: user.address, phone: user.phone}

    // create jwt tokens
    const tokens = createTokens(minusPassword);

    res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({accessToken: tokens.accessToken})
    
}


// takes in a user and creates access and refresh tokens.
function createTokens(user: User) {
    const accessToken = jwt.sign(user, JWT_SECRET, {expiresIn: '1h'});
    const refreshToken = jwt.sign(user, JWT_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken};
}