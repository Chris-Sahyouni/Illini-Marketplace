
export class Item {
   // id: string;
    price: number;
    readonly sellerId: string;
    name: string;
    description?: string;
    notes?: string;
    contact: string;
    // image: figure out what type this should be 
    sellerName: string;

    public constructor(price: number, name: string, contact: string, sellerName: string, sellerId: string) {
        this.price = price;
        this.name = name;
        this.contact = contact;
        this.sellerName = sellerName;
        this.sellerId = sellerId;
    }

}