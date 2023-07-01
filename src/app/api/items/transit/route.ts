import { prisma } from '../../../../lib/db'
import { dbRequest } from '@/src/lib/types/interfaces'
import { Transit } from '@prisma/client';
import { CardData } from '@/src/lib/types/interfaces';
import { ItemData } from '@/src/lib/types/models';

export async function POST(request: Request) {
    try {
        const  {filters, skipCount, sortBy, searchInput}: dbRequest = await request.json();

        // filters and sortBy need to be converted into usable types or values for prisma here

        // if (body.searchInput) {
        //     console.log("");
        //     // handle search here
        // }

        const data: Transit[] = await prisma.transit.findMany({
            take: 20,
            skip: 20 * skipCount
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