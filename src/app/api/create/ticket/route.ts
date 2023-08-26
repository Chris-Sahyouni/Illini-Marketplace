
import { ItemData } from '@/src/lib/types/models';
import { prisma } from '../../../../lib/db';
import { creationRequest } from '@/src/lib/types/interfaces';
import { fetchImageIds, moderateImage } from '@/src/lib/server-utils';


export async function POST(request: Request) {
    const body: creationRequest = await request.json();
    const { data, sellerId, id, numImages} = body;
    let success: boolean = false;
    let safe: boolean = numImages === 0;
    console.log(numImages);
    if (numImages > 0) {
        console.log('checking image safety');
        const imgId = await fetchImageIds(id);
        console.log('IMAGE ID: ', imgId);
        const url = `https://res.cloudinary.com/dhjby3hpo/image/upload/${imgId}`
        if (imgId) safe = await moderateImage(url, process.env.WEB_PURIFY_API_KEY || '');
    }
    console.log('SAFE: ', safe);
    if (safe) success = await createTicket(data, sellerId, id, numImages, body.notes);
    if (success) {

        const stats = await prisma.rangeMaxes.findFirst();
        const newPrice = data.visibleKeys ? Number(data.visibleValues[data.visibleKeys.indexOf('price')]) : 0;
        const newAmount = data.visibleKeys ? Number(data.visibleValues[data.visibleKeys.indexOf('amount')]) : 0;
        
        if (stats && newPrice > stats.textbookPrice) {
            await prisma.rangeMaxes.update({
                where: {
                    id: stats.id
                },
                data: {
                    ticketPrice: Math.max(newPrice, stats.ticketPrice),
                    ticketAmount: Math.max(newAmount, stats.ticketAmount)
                }
            })
        }

        return new Response('success', {status: 200});
    }
    return new Response('error', {status: 500});
}

async function createTicket(data: ItemData, sellerId: string, itemId: string, numImages: number, notes: string) {
    const {visibleKeys:keys, visibleValues:values} = data;

    if (keys && values) {
        try {
            await prisma.ticket.create({
                data: {
                    id: itemId,
                    type: values[keys.indexOf('type')],
                    name: values[keys.indexOf('event')],
                    event: values[keys.indexOf("event")],
                    date: values[keys.indexOf("date")],
                    amount: Number(values[keys.indexOf("amount")]),
                    price: Number(values[keys.indexOf("price")]),
                    contact: values[keys.indexOf("contact")],
                    notes,
                    numImages: numImages,
                    seller: {
                        connect: {
                            id: sellerId
                        }
                    }

                }
            });
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    return true;
}