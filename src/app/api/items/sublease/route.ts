import { prisma } from '../../../../lib/db'
import { dbRequest } from '@/src/lib/types/interfaces'
import { CardData } from '@/src/lib/types/interfaces';
import { ItemData } from '@/src/lib/types/models';


export async function POST(request: Request) {
    try {
        const  {filters, skipCount, ranges, searchInput}: dbRequest = await request.json();
        let selectedFilters: string[] = filters.map(([key, val]) => val);
        if (selectedFilters.length === 0) {
            selectedFilters = ['fall', 'spring', 'summer'];
        }
        console.log(selectedFilters)

        const data = await prisma.sublease.findMany({
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
                    {
                        bedrooms: {
                            gte: ranges[1][1][0]
                        }
                    },
                    {
                        bedrooms: {
                            lte: ranges[1][1][1]
                        }
                    },
                    {
                        bathrooms: {
                            gte: ranges[2][1][0]
                        }
                    },
                    {
                        bathrooms: {
                            lte: ranges[2][1][1]
                        }
                    },
                ],
                OR: [
                    {
                        term: {
                            in: selectedFilters
                        }
                    }
                ]
            }
        });

        let res: CardData[] = [];
        data.forEach((item) => {
          let dat = new ItemData(item);
          res.push(dat.getCardData());
        })

        return new Response(JSON.stringify(res));

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error));
    }

}

