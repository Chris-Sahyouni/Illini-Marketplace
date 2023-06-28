


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

    public constructor(sublease?: Sublease, textbook?: Textbook, transit?: TransitTicket, sport?: SportsTicket, parking?: Parking, misc?: Misc) {
        if (sublease) {

        }
        if (textbook) {
            this.constructFromTextbook(textbook);
            this.assignVisibleValues(Object.keys(textbook), Object.values(textbook));
        }
        if (sport) {

        }
        if (parking) {

        }
        if (misc) {

        }
    }

    private constructFromTextbook(prismaItem: Textbook) {
        this.id = prismaItem.id;
        this.type = ItemType.Textbook;
        this.visibleKeys = typeKeyMap.get(ItemType.Textbook);
        this.sellQuestions = typeQuestionMap.get(ItemType.Textbook);

        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromSublease(prismaItem: Sublease) {

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



export const subleaseKeys:  string[] = ["price", "address", "contact", "company", "numBedrooms", "numBathrooms", "startDate", "endDate", "notes"];
export const textbookKeys:  string[] = ['course', 'price', 'contact'];
export const transitKeys:  string[] = [];
export const ticketKeys:  string[] = [];
export const parkingKeys:  string[] = [];
export const miscKeys:  string[] = [];

// these strings are question and placeholder respectively
export const subleaseQuestions:  [string, string][] = [];
export const textbookQuestions:  [string, string][] = [['Course Code', 'eg. STAT 100'], ['Price', ''], ['How would you like to be contacted?', 'eg. 123-456-7890, or snap: john_doe123, etc']];
export const transitQuestions:  [string, string][] = [];
export const ticketQuestions:  [string, string][] = [];
export const parkingQuestions:  [string, string][] = [];
export const miscQuestions:  [string, string][] = [];


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





