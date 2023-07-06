


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
        this.constructGeneric(ItemType.Textbook);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromSublease(prismaItem: Sublease) {
        this.id = prismaItem.id;
        this.constructGeneric(ItemType.Sublease);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }

    private constructFromTransit(prismaItem: Transit) {
        this.id = prismaItem.id;
        this.constructGeneric(ItemType.Transit);
        this.assignVisibleValues(Object.keys(prismaItem), Object.values(prismaItem));
    }


    // this will have to change to just Ticket
    private constructFromTicket(prismaItem: Ticket) {
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





