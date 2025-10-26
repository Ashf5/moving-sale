import { db } from "../configuration/dataConnection";
import { Sale, SaleItem } from "../types/saleTypes";
import { QueryBuilder } from "knex";


// Gets sales, paginated. Defaults to 10. Returns a list of sales, with given paginated instructions.
export async function getSalesPaginatedDb(page = 1, limit = 10) {
    // get sale and seller info
    const sales = await db('sales')
        .join('users', 'users.id', 'sales.seller_id')
        .select([
            'sales.id',
            'users.firstname',
            'users.lastname',
            'users.email',
            'users.phone',
            'users.address',
            'users.profile_picture',
            'sales.date_created'
        ])
        .orderBy('sales.id')
        .offset((page - 1 || 0) * (limit || 10))
        .limit(limit || 10);

    if (!sales.length) return [];

    // get sale id's
    const saleIds = sales.map(s => s.id);

    // get three images from each sale
    const images = await db
        .select('sale_id')
        .select(db.raw('ARRAY_AGG(picture ORDER BY rn) AS images'))
        .from( db('items').
            select('sale_id', 'picture')
                .select(db.raw('ROW_NUMBER() OVER (PARTITION BY sale_id ORDER BY id) AS rn'))
                .from('items')
                .whereIn('sale_id', saleIds)
                .as('ranked')
        )
        .where('rn', '<=', 3)
        .groupBy('sale_id');

    const imagesBySale = Object.fromEntries(images.map(r => [r.sale_id, r.images]));

    return sales.map(sale => ({
        ...sale,
        images: imagesBySale[sale.id] || []
    }));

}


// Gets all the items in a sale
export async function getItemsDB(saleId: number) {
    const items = await db('items').select(['id', 'name', 'picture', 'price', 'is_active', 'note']).where({ sale_id: saleId });
    return items;
}

export async function createSaleDb(sale: Sale) {
    const createdSale = await db('sales').insert(sale, ['*']);
    return createdSale[0];
}


// takes a list of items, and returns their id's after being inserted into the database.
export async function addItemsDb(items: SaleItem[]) {
    const addedItems = await db('items').insert(items, ['id']);
    return addedItems;
}


export async function getSaleIdFromSeller(sellerId: number) {
    const saleId = await db('sales').select(['id']).where({ 'seller_id': sellerId }).first();
    if (saleId) return saleId.id;
    return undefined;
}

export async function getSaleDetailsFromSeller(sellerId: number) {
    const saleData = await db('users').join('sales', 'sales.seller_id', 'users.id').select(['sales.id','date_created', 'users.address', 'users.phone', 'users.email']).where({'users.id': sellerId}).first();
    return saleData
}
