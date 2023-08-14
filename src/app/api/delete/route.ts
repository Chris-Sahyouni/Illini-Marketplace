import { prisma } from "@/src/lib/db";
import { ItemType } from "@/src/lib/maps";


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

    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify(false), {status: 500});
    }
    return new Response(JSON.stringify(true), {status: 200});
}