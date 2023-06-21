import { prisma } from '../../../../lib/db'
import { dbRequest } from '@/src/lib/types/interfaces'
import { VisibleData, alignKeyValues } from '@/src/lib/utilities';
import { Misc } from '@prisma/client';


export async function POST(request: Request) {
    try {
    const  {filters, skipCount, sortBy, searchInput}: dbRequest = await request.json();

    // filters and sortBy need to be converted into usable types or values for prisma here

    // if (body.searchInput) {
    //     console.log("");
    //     // handle search here
    // }

    const data: Misc[] = await prisma.misc.findMany({
        take: 20,
        skip: 20 * skipCount
    });

    const desiredKeys: string[] = ['course', 'price', 'contact'];
    let parsed: VisibleData[] = [];
    data.forEach((item) => {
      parsed.push(alignKeyValues(desiredKeys, [Object.keys(item), Object.values(item).map(value => value !== null ? value.toString() : 'null')]));
    });


    return new Response(JSON.stringify(parsed));

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error));
    }
}