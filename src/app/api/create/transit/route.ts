
import { ItemData } from '@/src/lib/types/models';
import { prisma } from '../../../../lib/db';
import { creationRequest } from '@/src/lib/types/interfaces';


export async function POST(request: Request) {
    const body: creationRequest = await request.json();
    const { data, sellerId, id, numImages} = body;
    let success: boolean = false;
    success = await createTransit(data, sellerId, id, numImages, body.notes);
    if (success) {
        return new Response('success', {status: 200});
    }
    return new Response('error', {status: 500});
}


async function createTransit(data: ItemData, sellerId: string, itemId: string, numImages: number, notes: string) {
    const {visibleKeys:keys, visibleValues:values} = data;

    if (keys && values) {
        try {
            await prisma.transit.create({
                data: {
                    id: itemId,
                    mode: values[keys.indexOf('mode')],
                    from: values[keys.indexOf("from")],
                    time: values[keys.indexOf("time")],
                    to: values[keys.indexOf("to")],
                    date: values[keys.indexOf("date")],
                    name: "",
                    notes,
                    price: Number(values[keys.indexOf("price")]),
                    contact: values[keys.indexOf("contact")],
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