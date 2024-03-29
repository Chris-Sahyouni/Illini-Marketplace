
import { ItemData } from '@/src/lib/types/models';
import { prisma } from '../../../../lib/db';
import { creationRequest } from '@/src/lib/types/interfaces';
import { fetchImageIds, moderateImage } from '@/src/lib/server-utils';


export async function POST(request: Request) {
    const body: creationRequest = await request.json();
    const { data, sellerId, id, numImages} = body;
    let success: boolean = false;
    let safe: boolean = numImages === 0;
    if (numImages > 0) {
        const imgIds = await fetchImageIds(id);
        const moderate = async (index: number) => {
            if (imgIds) {
                const url = `https://res.cloudinary.com/dhjby3hpo/image/upload/${imgIds[index]}`
                return await moderateImage(url, process.env.WEB_PURIFY_API_KEY || '');
            }
        }
        let promises: Array<Promise<boolean | undefined>> = []
        for (let i = 0; i < numImages; i++) promises.push(moderate(i))
        const moderateRes = await Promise.all(promises);
        console.log("MODERATE RES", moderateRes)
        safe = !(moderateRes.includes(false));
    }
    if (safe) success = await createSublease(data, sellerId, id, numImages, body.notes);
    if (success) {

        const stats = await prisma.rangeMaxes.findFirst();
        const newPrice = data.visibleKeys ? Number(data.visibleValues[data.visibleKeys.indexOf('price')]) : 0;
        const newBed = data.visibleKeys ? Number(data.visibleValues[data.visibleKeys.indexOf('bedrooms')]) : 0;
        const newBath = data.visibleKeys ? Number(data.visibleValues[data.visibleKeys.indexOf('bathrooms')]) : 0;

        if (stats && newPrice > stats.textbookPrice) {
            await prisma.rangeMaxes.update({
                where: {
                    id: stats.id
                },
                data: {
                    subleasePrice: Math.max(newPrice, stats.subleasePrice),
                    subleaseBathrooms: Math.max(newBath, stats.subleaseBathrooms),
                    subleaseBedrooms: Math.max(newBed, stats.subleaseBedrooms)
                }
            })
        }

        return new Response('success', {status: 200});
    } else {
        console.log("success, ", success);
        console.log("safe, ", safe);
    }
    return new Response('error', {status: 500});
}

async function createSublease(data: ItemData, sellerId: string, itemId: string, numImages: number, notes: string) {
    const {visibleKeys:keys, visibleValues:values} = data;

    if (keys && values) {
        try {
            await prisma.sublease.create({
                data: {
                    id: itemId,
                    location: values[keys.indexOf("location")],
                    bathrooms: Number(values[keys.indexOf('bathrooms')]),
                    bedrooms: Number(values[keys.indexOf('bedrooms')]),
                    price: Number(values[keys.indexOf("price")]),
                    contact: values[keys.indexOf("contact")],
                    company: values[keys.indexOf("company")],
                    term: values[keys.indexOf("term")],
                    start: values[keys.indexOf("start")],
                    end: values[keys.indexOf("end")],
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

