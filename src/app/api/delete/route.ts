import { prisma } from "@/src/lib/db";
import { ItemType } from "@/src/lib/maps";


export async function POST(request: Request) {
    const { id, type } = await request.json();
    let success: boolean = false;
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
        }
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify(err), {status: 500});
    }
    return new Response(JSON.stringify(success), {status: 200});
}