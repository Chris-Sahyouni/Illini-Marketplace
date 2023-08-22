
import { ItemData } from '@/src/lib/types/models';
import { prisma } from '../../../../lib/db';
import { creationRequest } from '@/src/lib/types/interfaces';
import { ItemType } from '@/src/lib/maps';



export async function POST(request: Request) {
    const body: creationRequest = await request.json();
    const { data, sellerId, id, numImages} = body;
    let success: boolean = false;
    success = await createParking(data, sellerId, id, numImages);
    if (success) {
        return new Response('success', {status: 200});
    }
    return new Response('error', {status: 500});
}

async function createParking(data: ItemData, sellerId: string, itemId: string, numImages: number) {
    const {visibleKeys:keys, visibleValues:values} = data;

    if (keys && values) {
        try {
            await prisma.parking.create({
                data: {
                    id: itemId,
                    location: values[keys.indexOf('location')],
                    start: values[keys.indexOf("start")],
                    end: values[keys.indexOf("end")],
                    notes: values[keys.indexOf("notes")],
                    name: values[keys.indexOf('location')],
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