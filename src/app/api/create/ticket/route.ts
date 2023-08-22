
import { ItemData } from '@/src/lib/types/models';
import { prisma } from '../../../../lib/db';
import { creationRequest } from '@/src/lib/types/interfaces';



export async function POST(request: Request) {
    const body: creationRequest = await request.json();
    const { data, sellerId, id, numImages} = body;
    let success: boolean = false;
    success = await createTicket(data, sellerId, id, numImages);
    if (success) {
        return new Response('success', {status: 200});
    }
    return new Response('error', {status: 500});
}

async function createTicket(data: ItemData, sellerId: string, itemId: string, numImages: number) {
    const {visibleKeys:keys, visibleValues:values} = data;

    if (keys && values) {
        try {
            await prisma.ticket.create({
                data: {
                    id: itemId,
                    type: values[keys.indexOf('type')],
                    name: values[keys.indexOf('event')],
                    event: values[keys.indexOf("event")],
                    seat: values[keys.indexOf("seat")],
                    date: values[keys.indexOf("date")],
                    amount: Number(values[keys.indexOf("amount")]),
                    price: Number(values[keys.indexOf("price")]),
                    contact: values[keys.indexOf("contact")],
                    notes: values[keys.indexOf("notes")],
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