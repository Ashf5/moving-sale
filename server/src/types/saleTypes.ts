
export interface Sale {
    id?: number,
    seller_id: number,
    date_created?: Date
}


export interface SaleItem {
    id?: number,
    name: string,
    picture?: null | string,
    price: number,
    is_active?: boolean,
    sale_id: number,
    note?: string
}