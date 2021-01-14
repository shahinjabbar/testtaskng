export interface IProduct {
    id: number,
    name: string,
    featured: boolean,
    expirationDate: Date,
    itemsInStock: number,
    receiptDate: Date,
    rating: string,
    brand: any,
    categories: any[],
}
