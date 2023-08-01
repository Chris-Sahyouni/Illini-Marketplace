
import { ItemData } from '@/src/lib/types/models';
import { prisma } from '../../../../lib/db';
import { creationRequest } from '@/src/lib/types/interfaces';
import { ItemType } from '@/src/lib/maps';



export async function POST(request: Request) {
    const body: creationRequest = await request.json();
    const { data, sellerId, id} = body;
    let success: boolean = false;
    success = await createMisc(data, sellerId, id);
    if (success) {
        return new Response('success', {status: 200});
    }
    return new Response('error', {status: 500});
}

async function createMisc(data: ItemData, sellerId: string, itemId: string) {
    const {visibleKeys:keys, visibleValues:values} = data;

    if (keys && values) {
        try {
            await prisma.misc.create({
                data: {
                    id: itemId,
                    name: values[keys.indexOf('name')],
                    notes: values[keys.indexOf("notes")],
                    price: Number(values[keys.indexOf("price")]),
                    contact: values[keys.indexOf("contact")],
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