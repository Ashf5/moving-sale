import { db } from "../configuration/dataConnection";
import { Sale, SaleItem } from "../types/saleTypes";


export async function createSaleDb(sale:Sale) {
    const createdSale = await db('sales').insert(sale, ['*']);
    return createdSale[0];
}


// takes a list of items, and returns their id's after being inserted into the database.
export async function addItemsDb(items:SaleItem[]) {
    const addedItems = await db('items').insert(items, ['id']);
    return addedItems;
}


export async function getSaleIdFromSeller(sellerId:number) {
    const saleId = await db('sales').select(['id']).where({'seller_id': sellerId}).first();
    return saleId.id;
}