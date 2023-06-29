


// ItemData is meant to be an intermediary between the prisma item types and raw strings the cards render

import { Sublease, Textbook, TransitTicket, SportsTicket, Parking, Misc } from "@prisma/client";
import { CardData } from "./interfaces";

export class ItemData {
    visibleKeys:  string[] | undefined = [];
    visibleValues: string[] = [];
    sellQuestions:  [string, string][] | undefined = [];
    id?: string = "";
    name?: string = "";
    type: ItemType = ItemType.UnResolved;
    // image

    public constructor(sublease?: Sublease, textbook?: Textbook, transit?: TransitTicket, ticket?: SportsTicket, parking?: Parking, misc?: Misc) {
        if (sublease) {
            this.constructFromSublease(sublease);
        }
        if (textbook) {
            this.constructFromTextbook(textbook);
        }
        if (ticket) {
            this.constructFromTicket(ticket);
        }
        if (parking) {
            this.constructFromParking(parking);
        }
        if (transit) {
            this.constructFromTransit(transit);
        }
        if (misc) {
            this.constructFromMisc(misc);
        }
    }

    private constructGeneric(itemType: ItemType) {
        this.type = itemType;
        this.visibleKeys = typeKeyMap.get(itemType);
        this.sellQuestions = typeQuestionMap.get(itemType);
    }

    private constructFromTextbook(prismaItem: Textbook) {
        this.id = prismaItem.id;
        this.constructGeneric(ItemType.Textbook);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromSublease(prismaItem: Sublease) {
        this.id = prismaItem.id;
        this.constructGeneric(ItemType.Sublease);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromTransit(prismaItem: TransitTicket) {
        this.id = prismaItem.id;
        this.constructGeneric(ItemType.Transit);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }


    // this will have to change to just Ticket
    private constructFromTicket(prismaItem: SportsTicket) {
        this.id = prismaItem.id;
        this.constructGeneric(ItemType.Ticket);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromParking(prismaItem: Parking) {
        this.id = prismaItem.id;
        this.constructGeneric(ItemType.Parking);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromMisc(prismaItem: Misc) {
        this.id = prismaItem.id;
        this.constructGeneric(ItemType.Misc);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    public assignVisibleValues(allKeys: string[], allValues: any[]): void {
        if (this.visibleKeys) {
            for (let visKey of this.visibleKeys) {
                let pureVal = allValues[(allKeys.indexOf(visKey))];
                let asString;
                try {
                    // apply string conversion rules here
                    if (typeof pureVal === "number") asString = pureVal.toString();
                    else if (typeof pureVal === "object") asString = pureVal.toDateString();
                    else asString = pureVal;

                } catch (err) {
                    console.log(err);
                }
                this.visibleValues.push(asString);
            }
        }
    }

    public getCardData(): CardData {
        const data: CardData = {
            keys: this.visibleKeys,
            values: this.visibleValues,
            id: this.id,
            type: this.type
        }
        return data;
    }

}


/* -------------------------------------------------------------------------- */

export enum ItemType {
    Sublease,
    Textbook,
    Transit,
    Ticket,
    Parking,
    Misc,
    UnResolved
}

const contactPair: [string, string] = ['How would you like to be contacted?', 'eg. 123-456-7890, or snap: john_doe123, etc'];

// is company really necessary?
export const subleaseKeys:  string[] = ["address", "price", "contact", "company", "numBedrooms", "numBathrooms", "startDate", "endDate", "notes"];
export const textbookKeys:  string[] = ['course', 'price', 'contact'];
export const transitKeys:  string[] = ['mode', 'price', 'date'];
export const ticketKeys:  string[] = ['event', 'price', 'date', 'seat'];
export const parkingKeys:  string[] = ['location', 'price', 'startDate', 'endDate'];
export const miscKeys:  string[] = ['name', 'price', 'notes'];

// these strings are question and placeholder respectively
export const subleaseQuestions:  [string, string][] = [['Address/Location', 'eg. 123 E Green, or HERE'], ['Rent (per person/month)', ''], contactPair, ['Company', 'eg. Smile'], ["How many bedrooms", ""], ['How many bathrooms', ''], ['Start Date', ''], ['End Date', ''], ['Any other information you want to add', '']];
export const textbookQuestions:  [string, string][] = [['Course Code', 'eg. STAT 100'], ['Price', ''], contactPair];
export const transitQuestions:  [string, string][] = [['What mode', 'eg. Amtrack, Peoria Charter'], ['Price', ''], ['Date', '']];
export const ticketQuestions:  [string, string][] = [['What event', ''], ['Price', ''], ['Date', ''], ['Seat (if applicable)', '']];
export const parkingQuestions:  [string, string][] = [['Location', ''], ['Price', ''], ['Start Date', ''], ['End Date', '']];
export const miscQuestions:  [string, string][] = [['What are you selling', ''], ['Price', ''], ['Any other information you want to add', '']];


export const typeKeyMap = new Map<ItemType,  string[]>([
    [ItemType.Sublease, subleaseKeys],
    [ItemType.Textbook, textbookKeys],
    [ItemType.Transit, transitKeys],
    [ItemType.Ticket, ticketKeys],
    [ItemType.Parking, parkingKeys],
    [ItemType.Misc, miscKeys],
]);

export const typeQuestionMap = new Map<ItemType,  [string, string][]>([
    [ItemType.Sublease, subleaseQuestions],
    [ItemType.Textbook, textbookQuestions],
    [ItemType.Transit, transitQuestions],
    [ItemType.Ticket, ticketQuestions],
    [ItemType.Parking, parkingQuestions],
    [ItemType.Misc, miscQuestions]
]);





