import { prisma } from '../../../../lib/db'
import { CardData, dbRequest } from '@/src/lib/types/interfaces'
import type { Textbook } from '@prisma/client';
import { ItemData} from '@/src/lib/types/models';


export async function POST(request: Request) {
    try {
        const  {skipCount, ranges, searchInput}: dbRequest = await request.json();

        const data: Textbook[] = await prisma.textbook.findMany({
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
                        }
                    ]
            }
        });

        let res: CardData[] = [];
        data.forEach((item) => {
          let dat = new ItemData(undefined, item);
          res.push(dat.getCardData());
        })

        return new Response(JSON.stringify(res));

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error));
    }
}