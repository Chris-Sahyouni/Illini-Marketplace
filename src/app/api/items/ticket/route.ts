import { prisma } from '../../../../lib/db'
import { dbRequest } from '@/src/lib/types/interfaces'
import { Ticket } from '@prisma/client';
import { CardData } from '@/src/lib/types/interfaces';
import { ItemData } from '@/src/lib/types/models';

export async function POST(request: Request) {
    try {
        const  {filters, skipCount, ranges, searchInput}: dbRequest = await request.json();

        

        // if (body.searchInput) {
        //     console.log("");
        //     // handle search here
        // }
        console.log(ranges);
        const data: Ticket[] = await prisma.ticket.findMany({
            take: 20,
            skip: 20 * skipCount,
            where: {
                AND: [
                    {
                        price: {
                            gte: ranges[0][1][0],
                        }  
                    },
                    {
                        price: {
                            lte: ranges[0][1][1],
                        }
                    }
                ]
                
                // amount: {
                //     gte: ranges[1][1][0],
                //     lte: ranges[1][1][1]
                // }
            }
        });
        // console.log("DATA: ", data);
        let res: CardData[] = [];
        data.forEach((item) => {
          let dat = new ItemData(undefined, undefined, undefined, item);
          res.push(dat.getCardData());
        })

        return new Response(JSON.stringify(res));

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error));
    }
}