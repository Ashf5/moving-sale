import { db } from "../configuration/dataConnection";
import { Sale, SaleItem } from "../types/saleTypes";


// Gets sales, paginated. Defaults to 10. Returns a list of sales, with given paginated instructions.
export async function getSalesPaginatedDb(page=1, limit=10) {
    const sales = await db('sales').join('users', 'users.id', 'sales.seller_id').select(['firstname', 'lastname', 'email', 'phone', 'address', 'sales.id', 'date_created']).offset((page - 1 || 0) * (limit || 10)).limit(limit || 10);
    return sales;


}

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
