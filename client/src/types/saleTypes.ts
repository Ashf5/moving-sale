
export interface Sale {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    profile_picture: null | string;
    date_created: string;
    images: (string | null)[]
}


export interface SaleInfo {
    id: number;
    date_created: Date;
    address: string;
    phone: string;
    email: string;

}