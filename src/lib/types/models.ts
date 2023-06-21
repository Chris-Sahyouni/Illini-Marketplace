
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

// export class Sublease extends Item {
//     address: string;
//     // images: Image[]
//     company: string;
//     numBedrooms: number;
//     numBathrooms: number;
//     startDate: Date;
//     endDate:  Date;

//     public constructor(price: number, name: string, contact: string, sellerName: string, sellerId: string, address: string, company: string, numBedrooms: number, numBathrooms: number, startDate: Date, endDate: Date) {
//         super(price, name, contact, sellerName, sellerId);
//         this.address = address;
//         this.company = company;
//         this.numBedrooms = numBedrooms;
//         this.numBathrooms = numBathrooms;
//         this.startDate = startDate;
//         this.endDate = endDate;
//     }

//     public VisibleFields(): [string, number, string, number, number, Date, Date, string, string?] {
//         return [this.address, this.price, this.company, this.numBedrooms, this.numBathrooms, this.startDate, this.endDate, this.contact, this.notes];
//     }
// }
