import { prisma } from '../../../../lib/db'
import { dbRequest } from '@/src/lib/types/interfaces'
import { CardData } from '@/src/lib/types/interfaces';
import { ItemData } from '@/src/lib/types/models';

export async function POST(request: Request) {
    try {
        const  {filters, skipCount, ranges, searchInput}: dbRequest = await request.json();

        let selectedFilters: string[] = filters.map(([key, val]) => val);
        if (selectedFilters.length === 0) {
            selectedFilters = ['Peoria Charter', 'Amtrack', 'other'];
        }


        const data = await prisma.transit.findMany({
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
                ],
                OR: [
                    {
                        mode: {
                            in: selectedFilters
                        }
                    }
                ]
            }
        });

        let res: CardData[] = [];
        data.forEach((item) => {
          let dat = new ItemData(undefined, undefined, item);
          res.push(dat.getCardData());
        })

        return new Response(JSON.stringify(res));

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error));
    }
}