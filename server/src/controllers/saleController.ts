
import { Request, Response } from "express";
import { addItemsDb, createSaleDb, getItemsDB, getSaleIdFromSeller, getSalesPaginatedDb } from "../models/saleModel";
import { SaleItem, VerifiedItem } from "../types/saleTypes";
import { verifyItem } from "../helpers/verifyData";


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



// Adds a list of items into the items database, also gets the user sale id number.
export async function addSaleItems(req: Request, res: Response) {

    const items = req.body.items;
    // Get sale id
    const sellerId = req.user?.id as number;
    let saleId:number;
    try {
        saleId = await getSaleIdFromSeller(sellerId);
        
        if(!saleId) {
            return res.status(404).json({msg: 'No sales found by seller'})
        }
    }
    catch(e) {
        return res.status(500).json({msg: 'something went wrong'});
    }

    let verifiedData:SaleItem[] = [];
    try {
        for (let item of items) {
            let verifiedItem:VerifiedItem = await verifyItem({name:item.name, picture:item.picture, price:item.price, note: item.note});
            verifiedData.push({...verifiedItem, sale_id: saleId})
        }
    }
        
    catch(e) {
        return res.status(400).json({msg: 'invalid data received.'});
    }

    // Add new item 
    try {
        const addedItems = await addItemsDb(verifiedData);
        return res.status(201).json({msg: 'Items Added'});

    }
    catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Error adding new items'});
    }
    
}


// Gets paginated sales. accepts query params of limit and page.
export async function getSales(req:Request, res:Response) {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    try {
        const sales = await getSalesPaginatedDb(page, limit);
        return res.status(200).json(sales);
    }
    catch(e) {
        return res.status(500).json({msg: 'Error fetching sales'});
    }

}


export async function getItems(req:Request, res:Response) {
    const id = Number(req.params.saleId);
    if(!id) {
        return res.status(400).json({msg: 'invalid saleId provided'});
    }

    try {
        const items = await getItemsDB(id);
        return res.status(200).json(items);
    }
    catch(e) {
        return res.status(500).json({msg: 'Error fetching sale items.'})
    }
}