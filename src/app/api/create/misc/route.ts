
import { ItemData } from '@/src/lib/types/models';
import { prisma } from '../../../../lib/db';
import { creationRequest } from '@/src/lib/types/interfaces';
import { ItemType } from '@/src/lib/maps';
import { fetchImageIds, moderateImage } from '@/src/lib/server-utils';



export async function POST(request: Request) {
    const body: creationRequest = await request.json();
    const { data, sellerId, id, numImages} = body;
    let success: boolean = false;
    let safe: boolean = numImages === 0;
    if (numImages > 0) {
        const imgId = await fetchImageIds(id);
        const url = `https://res.cloudinary.com/dhjby3hpo/image/upload/${imgId}`
        if (imgId) safe = await moderateImage(url, process.env.WEB_PURIFY_API_KEY || '');
    }
    if (safe) success = await createMisc(data, sellerId, id, numImages, body.notes);

    if (success) {

        const stats = await prisma.rangeMaxes.findFirst();
        const newPrice = data.visibleKeys ? Number(data.visibleValues[data.visibleKeys.indexOf('price')]) : 0;
        if (stats && newPrice > stats.miscPrice) {
            await prisma.rangeMaxes.update({
                where: {
                    id: stats.id
                },
                data: {
                    miscPrice: newPrice
                }
            })
        }

        return new Response('success', {status: 200});
    }
    return new Response('error', {status: 500});
}

async function createMisc(data: ItemData, sellerId: string, itemId: string, numImages: number, notes: string) {
    const {visibleKeys:keys, visibleValues:values} = data;

    if (keys && values) {
        try {
            await prisma.misc.create({
                data: {
                    id: itemId,
                    name: values[keys.indexOf('name')],
                    description: values[keys.indexOf("description")],
                    price: Number(values[keys.indexOf("price")]),
                    contact: values[keys.indexOf("contact")],
                    numImages: numImages,
                    notes: notes,
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