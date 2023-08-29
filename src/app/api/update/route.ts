import { CardData } from '@/src/lib/types/interfaces';
import { prisma } from '../../../lib/db';
import { ItemType } from '@/src/lib/maps';

interface udpateRequest {
    item: CardData
}

export async function POST(request: Request) {
    const { item }: udpateRequest = await request.json();
    const keys = item.keys || [];
    const vals = item.values || [];
    let updated;

    try {
        switch (item.type) {
            case ItemType.Sublease: {
                updated = await prisma.sublease.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        location: vals[keys.indexOf('location')],
                        company: vals[keys.indexOf("company")],
                        bedrooms: Number(vals[keys.indexOf("bedrooms")]),
                        bathrooms: Number(vals[keys.indexOf("bathrooms")]),
                        start: vals[keys.indexOf("start")],
                        end: vals[keys.indexOf("end")],
                        term: vals[keys.indexOf("term")],
                        price: Number(vals[keys.indexOf('price')]),
                        notes: item.notes,
                        contact: vals[keys.indexOf("contact")],
                    }
                })
                break;
            }
            case ItemType.Textbook: {
                updated = await prisma.textbook.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        course: vals[keys.indexOf("course")],
                        price: Number(vals[keys.indexOf("price")]),
                        notes: item.notes,
                        contact: vals[keys.indexOf('contact')],
                    }
                })
                break;
            }
            case ItemType.Transit: {
                updated = await prisma.transit.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        price: Number(vals[keys.indexOf("price")]),
                        notes: item.notes,
                        contact: vals[keys.indexOf('contact')],
                        from: vals[keys.indexOf("from")],
                        to: vals[keys.indexOf("to")],
                        date: vals[keys.indexOf("date")],
                        mode: vals[keys.indexOf("mode")],
                        time: vals[keys.indexOf("time")],
                    }
                })
                break;
            }
            case ItemType.Ticket: {
                updated = await prisma.ticket.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        price: Number(vals[keys.indexOf("price")]),
                        notes: item.notes,
                        contact: vals[keys.indexOf('contact')],
                        type: vals[keys.indexOf("type")],
                        event: vals[keys.indexOf("event")],
                        amount: Number(vals[keys.indexOf("amount")]),
                    }
                })
                break;
            }
            case ItemType.Parking: {
                updated = await prisma.parking.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        price: Number(vals[keys.indexOf("price")]),
                        notes: item.notes,
                        contact: vals[keys.indexOf('contact')],
                        location: vals[keys.indexOf("location")],
                        start: vals[keys.indexOf("start")],
                        end: vals[keys.indexOf("end")]
                    }
                })
                break;
            }
            case ItemType.Misc: {
                updated = await prisma.misc.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        price: Number(vals[keys.indexOf("price")]),
                        notes: item.notes,
                        contact: vals[keys.indexOf('contact')],
                        description: vals[keys.indexOf("description")],
                    }
                })
                break;
            }
        }
        return new Response(JSON.stringify(updated), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify(error), {status: 500})
    }
}