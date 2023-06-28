
import { ItemData, ItemType } from '@/src/lib/types/models';
import { prisma } from '../../../lib/db';
import { creationRequest } from '@/src/lib/types/interfaces';



export async function POST(request: Request) {
    const body: creationRequest = await request.json();
    const { data, sellerId } = body;
    let success: boolean = false;
    switch (data.type) {
        case ItemType.Textbook: {
            success = await createTextbook(data, sellerId);
        }
    }
    if (success) {
        return new Response('success', {status: 200});
    } 
    return new Response('error', {status: 500});
}

async function createTextbook(data: ItemData, sellerId: string) {
    const {visibleKeys:keys, visibleValues:values} = data;
    
    if (keys && values) {
        try {
            await prisma.textbook.create({
                data: {
                    course: values[keys.indexOf('course')],
                    name: values[keys.indexOf('course')],
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
