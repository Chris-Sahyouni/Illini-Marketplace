import { prisma } from '../../../../lib/db'
import { CardData, dbRequest } from '@/src/lib/types/interfaces'
import { alignKeyValues, getVisibleValues } from '@/src/lib/utilities';
import { Textbook } from '@prisma/client';
import { VisibleData } from '@/src/lib/utilities';
import { ItemData, ItemType, typeKeyMap } from '@/src/lib/types/models';


export async function POST(request: Request) {
    try {
        const  {filters, skipCount, sortBy, searchInput}: dbRequest = await request.json();

        // filters and sortBy need to be converted into usable types or values for prisma here

        // if (body.searchInput) {
        //     console.log("");
        //     // handle search here
        // }

        const data: Textbook[] = await prisma.textbook.findMany({
            take: 20,
            skip: 20 * skipCount
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