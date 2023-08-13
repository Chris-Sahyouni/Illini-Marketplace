import { CardData, userSellingRequest } from "@/src/lib/types/interfaces";
import { prisma } from '../../../lib/db'
import { ItemData } from "@/src/lib/types/models";
import build from "next/dist/build";
import { Misc, Parking, Sublease, Textbook, Ticket, Transit } from "@prisma/client";

export async function POST(request: Request) {
    console.log("req received");
    const {id}: userSellingRequest = await request.json();
    try {
        const query = await prisma.user.findUnique({
            select: {
                SubleaseSelling: true,
                TicketSelling: true,
                TextbookSelling: true,
                TransitSelling: true,
                ParkingSelling: true,
                MiscSelling: true,
            },
            where: {
                id: id
            }
        });
        console.log("QUERY RESULT: ", query);
        let allCardData: CardData[] = []
        
        allCardData = [...buildCardData(query?.SubleaseSelling),
             ...buildCardData(query?.TicketSelling),
              ...buildCardData(query?.TextbookSelling),
               ...buildCardData(query?.TransitSelling),
                ...buildCardData(query?.ParkingSelling),
                ...buildCardData(query?.MiscSelling)];
        // query.forEach((item) => {
        //     const cardDat = buildCardData(item);
        //     if (cardDat) {
        //         allCardData.push(cardDat);
        //     }
        // })

        console.log('PARSED: ', allCardData);
        return new Response(JSON.stringify(allCardData));

    } catch (error) {
        console.log("ERR: ", error);
        return new Response(JSON.stringify(error), {status: 500});
    }
}


// this could probably get exported to every route in the API

function buildCardData(items: any) {

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

