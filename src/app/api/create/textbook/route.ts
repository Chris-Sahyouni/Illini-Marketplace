
import { ItemData } from '@/src/lib/types/models';
import { prisma } from '../../../../lib/db';
import { creationRequest } from '@/src/lib/types/interfaces';
import { ItemType } from '@/src/lib/maps';



export async function POST(request: Request) {
    const body: creationRequest = await request.json();
    const { data, sellerId, id, numImages} = body;
    let success: boolean = false;
    success = await createTextbook(data, sellerId, id, numImages, body.notes);
    if (success) {
        return new Response('success', {status: 200});
    }
    return new Response('error', {status: 500});
}

async function createTextbook(data: ItemData, sellerId: string, itemId: string, numImages: number, notes: string) {
    const {visibleKeys:keys, visibleValues:values} = data;

    if (keys && values) {
        try {
            await prisma.textbook.create({
                data: {
                    id: itemId,
                    course: values[keys.indexOf('course')],
                    name: values[keys.indexOf('course')],
                    price: Number(values[keys.indexOf("price")]),
                    contact: values[keys.indexOf("contact")],
                    numImages: numImages,
                    notes,
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
