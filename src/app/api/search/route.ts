import { searchRequest } from '@/src/lib/types/interfaces'
import { Parking, Sublease, Ticket, Transit, Misc, Textbook } from '@prisma/client';
import { CardData } from '@/src/lib/types/interfaces';
import { ItemData } from '@/src/lib/types/models';
import { prisma } from '@/src/lib/db';


export async function POST(request: Request) {
    try {
        const {search, type}: searchRequest = await request.json();

        const data = await searchDB(type, search);

        let res: CardData[] = [];

        switch (type) {
            case 'sublease': {
                data?.forEach((item) => {
                    let dat = new ItemData(item as Sublease);
                    res.push(dat.getCardData());
                });
                break;
            }
            case 'textbook': {
                data?.forEach((item) => {
                    let dat = new ItemData(undefined, item as Textbook);
                    res.push(dat.getCardData());
                });
                break;
            }
            case 'transit': {
                data?.forEach((item) => {
                    let dat = new ItemData(undefined, undefined, item as Transit);
                    res.push(dat.getCardData());
                });
                break;
            }
            case 'ticket': {
                data?.forEach((item) => {
                    let dat = new ItemData(undefined, undefined, undefined, item as Ticket);
                    res.push(dat.getCardData());
                });
                break;
            }
            case 'parking': {
                data?.forEach((item) => {
                    let dat = new ItemData(undefined, undefined, undefined, undefined, item as Parking);
                    res.push(dat.getCardData());
                });
                break;
            }
            case 'misc': {
                data?.forEach((item) => {
                    let dat = new ItemData(undefined, undefined, undefined, undefined, undefined, item as Misc);
                    res.push(dat.getCardData());
                });
                break;
            }
        }

        return new Response(JSON.stringify(res));

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error));
    }
}

async function searchDB(type: string, query: string) {
    switch (type) {
        case 'sublease': {
            const data: Sublease[] = await prisma.sublease.findMany({
                where: {
                    OR: [
                        {
                            location: {
                                search: query
                            }
                        },
                        {
                            notes: {
                                search: query
                            }
                        }
                    ]
                }
            });
            return data;
        }
        case 'textbook': {
            const data: Textbook[] = await prisma.textbook.findMany({
                where: {
                    OR: [
                        {
                            course: {
                                search: query
                            }
                        },
                        {
                            notes: {
                                search: query
                            }
                        }
                    ]
                }
            });
            return data;
        }
        case 'transit': {
            const data: Transit[] = await prisma.transit.findMany({
                where: {
                    OR: [
                        {
                            mode: {
                                search: query
                            }
                        },
                        {
                            to: {
                                search: query
                            }
                        },
                        {
                            from: {
                                search: query
                            }
                        },
                        {
                            notes: {
                                search: query
                            }
                        }
                    ]
                }
            });
            return data;
        }
        case 'parking': {
            const data: Parking[] = await prisma.parking.findMany({
                where: {
                    OR: [
                        {
                            location: {
                                search: query
                            }
                        },
                        {
                            notes: {
                                search: query
                            }
                        }
                    ]
                }
            });
            return data;
        }
        case 'ticket': {
            const data: Ticket[] = await prisma.ticket.findMany({
                where: {
                    OR: [
                        {
                            event: {
                                search: query
                            }
                        },
                        {
                            notes: {
                                search: query
                            }
                        }
                    ]
                }
            });
            return data;
        }
        case 'misc': {
            const data: Misc[] = await prisma.misc.findMany({
                where: {
                    OR: [
                        {
                            name: {
                                search: query
                            }
                        },
                        {
                            notes: {
                                search: query
                            }
                        }
                    ]
                }
            });
            return data;
        }
    }

    return null;

}