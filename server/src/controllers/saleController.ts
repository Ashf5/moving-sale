
import { Request, Response } from "express";
import { createSaleDb } from "../models/saleModel";


export async function createSale(req: Request, res: Response) {
    const seller_id = req.user?.id;
    if (!seller_id) {
        return res.status(403).json({msg: 'missing user information'});
    }

    const sale = await createSaleDb({seller_id});
    return res.status(201).json(sale);
}