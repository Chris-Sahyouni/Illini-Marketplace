import { Sublease, Textbook, Transit, Ticket, Parking, Misc } from "@prisma/client";
import { CardData } from "./types/interfaces";
import { ItemData } from "./types/models";


export async function getUserSaves(id: string | undefined, onlyIds: boolean) {
    if (id === undefined) {
        return [];
    }
    const res = await fetch('http://localhost:3000/api/user-saved', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id,
            onlyIds
        })
    });
    return await res.json();
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
