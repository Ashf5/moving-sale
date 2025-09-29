
import { Request, Response } from "express";
import { verifyUserData } from "../helpers/verifyData";
import { User } from "../types/userTypes";
import { createNewUserDB } from "../models/userModel";


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


    return res.status(201).json(createdUser);
}