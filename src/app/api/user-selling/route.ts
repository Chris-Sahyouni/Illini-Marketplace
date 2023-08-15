import { CardData, userSellingRequest } from "@/src/lib/types/interfaces";
import { prisma } from '../../../lib/db'
import { buildCardData } from "@/src/lib/utilities";

export async function POST(request: Request) {
    const {id}: userSellingRequest = await request.json();
    try {
        const query = await prisma.user.findUnique({
            select: {
                SubleaseSelling: true,
                TicketSelling: true,
                TextbookSelling: true,
                TransitSelling: true,
                ParkingSelling: true,
                MiscSelling: true,
            },
            where: {
                id: id
            }
        });

        const allCardData = [
            ...buildCardData(query?.SubleaseSelling),
             ...buildCardData(query?.TicketSelling),
              ...buildCardData(query?.TextbookSelling),
               ...buildCardData(query?.TransitSelling),
                ...buildCardData(query?.ParkingSelling),
                ...buildCardData(query?.MiscSelling)
        ];

        return new Response(JSON.stringify(allCardData));

    } catch (error) {
        return new Response(JSON.stringify(error), {status: 500});
    }
}



