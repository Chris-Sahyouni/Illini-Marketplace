import { prisma } from '../../../../lib/db'
import { dbRequest } from '@/src/lib/types/interfaces'
import type { Misc } from '@prisma/client';
import { CardData } from '@/src/lib/types/interfaces';
import { ItemData } from '@/src/lib/types/models';

export async function POST(request: Request) {
    try {
        const  {skipCount, ranges, searchInput}: dbRequest = await request.json();

        const data: Misc[] = await prisma.misc.findMany({
            take: 20,
            skip: 20 * skipCount,
            where: {
                AND: [
                    {
                        price: {
                            gte: ranges[0][1][0]
                        }
                    },
                    {
                        price: {
                            lte: ranges[0][1][1]
                        }
                    },
                ]
            }
        });

        let res: CardData[] = [];
        data.forEach((item) => {
          let dat = new ItemData(undefined, undefined, undefined, undefined, undefined, item);
          res.push(dat.getCardData());
        })

        return new Response(JSON.stringify(res));

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error));
    }
}