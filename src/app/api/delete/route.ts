import { prisma } from "@/src/lib/db";
import { ItemType } from "@/src/lib/maps";
import * as cloudinary from 'cloudinary'

export async function POST(request: Request) {
    const { id, type } = await request.json();

    try {
        switch (type) {
            case ItemType.Sublease: {
                await prisma.sublease.delete({
                    where: {
                        id: id
                    }
                });
                break;
            }
            case ItemType.Textbook: {
                await prisma.textbook.delete({
                    where: {
                        id: id
                    }
                });
                break;
            }
            case ItemType.Transit: {
                await prisma.transit.delete({
                    where: {
                        id: id
                    }
                });
                break;
            }
            case ItemType.Ticket: {
                await prisma.ticket.delete({
                    where: {
                        id: id
                    }
                });
                break;
            }
            case ItemType.Parking: {
                await prisma.parking.delete({
                    where: {
                        id: id
                    }
                });
                break;
            }
            case ItemType.Misc: {
                await prisma.misc.delete({
                    where: {
                        id: id
                    }
                });
                break;
            }
            default: {
                return new Response(JSON.stringify(false), {status: 500});
            }
        }

        const cloudinaryConfig = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
          };

        cloudinary.v2.config(cloudinaryConfig);
        await cloudinary.v2.api.delete_resources_by_prefix(id, cloudinaryConfig);

    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify(false), {status: 500});
    }
    return new Response(JSON.stringify(true), {status: 200});
}