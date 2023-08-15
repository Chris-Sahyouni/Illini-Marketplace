


// ItemData is meant to be an intermediary between the prisma item types and raw strings the cards render

import { Sublease, Textbook, Ticket, Transit, Parking, Misc } from "@prisma/client";
import { CardData } from "./interfaces";
import { ItemType, typeKeyMap, typeQuestionMap } from "../maps";

export class ItemData {
    visibleKeys:  string[] | undefined = [];
    visibleValues: string[] = [];
    sellQuestions:  [string, string][] | undefined = [];
    id?: string = "";
    name?: string = "";
    type: ItemType = ItemType.UnResolved;
    hasImage: boolean = false;
    // image

    public constructor(sublease?: Sublease, textbook?: Textbook, transit?: Transit, ticket?: Ticket, parking?: Parking, misc?: Misc) {
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
        this.hasImage = prismaItem.hasImage;
        this.constructGeneric(ItemType.Textbook);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromSublease(prismaItem: Sublease) {
        this.id = prismaItem.id;
        this.hasImage = prismaItem.hasImage;
        this.constructGeneric(ItemType.Sublease);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromTransit(prismaItem: Transit) {
        this.id = prismaItem.id;
        this.hasImage = prismaItem.hasImage;
        this.constructGeneric(ItemType.Transit);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromTicket(prismaItem: Ticket) {
        this.id = prismaItem.id;
        this.hasImage = prismaItem.hasImage;
        this.constructGeneric(ItemType.Ticket);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromParking(prismaItem: Parking) {
        this.id = prismaItem.id;
        this.hasImage = prismaItem.hasImage;
        this.constructGeneric(ItemType.Parking);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromMisc(prismaItem: Misc) {
        this.id = prismaItem.id;
        this.hasImage = prismaItem.hasImage;
        this.constructGeneric(ItemType.Misc);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    public assignVisibleValues(allKeys: string[], allValues: any[]): void {
        if (this.visibleKeys) {
            for (let visKey of this.visibleKeys) {
                let pureVal = allValues[(allKeys.indexOf(visKey))];
                let asString;
                try {
                    // apply string conversion rules here THERE IS A TYPE ERROR WITH TO DATE STRING
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
            type: this.type,
            hasImage: this.hasImage,
        }
        return data;
    }

}


export function buildCardData(items: any) {

    if (items === undefined) return [];
    if (items === undefined) {
        return [];
    }

    let out: CardData[] = [];
    items.forEach((item: any) => {
        const keys = Object.keys(item);
        if (keys.includes('bedrooms')) {
            // sublease
            let sublease = item as Sublease
            let itemData = new ItemData(sublease);
            out.push(itemData.getCardData());

        } else if (keys.includes('course')) {
            // textbook
            let textbook = item as Textbook;
            let itemData = new ItemData(undefined, textbook);
            out.push(itemData.getCardData());
        } else if (keys.includes('mode')) {
            // transit
            let transit = item as Transit;
            let itemData = new ItemData(undefined, undefined, transit);
            out.push(itemData.getCardData());
        } else if (keys.includes('event')) {
            // ticket
            let ticket = item as Ticket;
            let itemData = new ItemData(undefined, undefined, undefined, ticket);
            out.push(itemData.getCardData());
        } else if (keys.includes('location')) {
            // parking
            let parking = item as Parking;
            let itemData = new ItemData(undefined, undefined, undefined, undefined, parking);
            out.push(itemData.getCardData());
        } else {
            // misc
            let misc = item as Misc;
            let itemData = new ItemData(undefined, undefined, undefined, undefined, undefined, misc);
            out.push(itemData.getCardData());
        }
    });
    return out;
}





