
import { Request, Response } from "express";
import { createSaleDb, getSaleIdFromSeller } from "../models/saleModel";


// creates a new sale, only for a verified user
export async function createSale(req: Request, res: Response) {
    const seller_id = req.user?.id;
    if (!seller_id) {
        return res.status(403).json({msg: 'missing user information'});
    }
    try {
        const sale = await createSaleDb({seller_id});
        return res.status(201).json(sale);
    }
    catch(e) {

        // check if seller already has a sale, and error is violating unique constraint.
        if(typeof e === 'object' && e !== null && 'code' in e) {
            if (e.code === '23505') {
                return res.status(400).json({msg: 'Seller already has a sale, one sale per seller'})
            }

        }
        
        return res.status(500).json({msg: 'error creating new sale.'});
    }
    
}


// TODO finish this function, as of now it just returns the sellers sale id
export async function addSaleItems(req: Request, res: Response) {

    const sellerId = req.user?.id as number;
    try {
        const saleId = await getSaleIdFromSeller(sellerId);
        
        if(!saleId) {
            return res.status(404).json({msg: 'No sales found by seller'})
        }
        return res.status(200).json(saleId);
    }
    catch(e) {
        return res.status(500).json({msg: 'something went wrong'});
    }
    
}