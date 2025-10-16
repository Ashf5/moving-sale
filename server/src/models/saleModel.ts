import { db } from "../configuration/dataConnection";
import { Sale } from "../types/saleTypes";


export async function createSaleDb(sale:Sale) {
    const createdSale = await db('sales').insert(sale, ['*']);
    return createdSale[0];
}