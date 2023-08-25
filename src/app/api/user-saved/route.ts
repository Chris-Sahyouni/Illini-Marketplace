import { prisma } from "../../../lib/db";
import { buildCardData } from "@/src/lib/client-utils";

export async function POST(request: Request) {
    const { id, onlyIds } = await request.json();

    if (id === undefined) {
        return new Response(JSON.stringify({}), {status: 401});
    }
    try {
    const saved = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            SubleaseSaved: true,
            TicketSaved: true,
            TransitSaved: true,
            TextbookSaved: true,
            ParkingSaved: true,
            MiscSaved: true,
        }
    });

    const allCardData = [
        ...buildCardData(saved?.SubleaseSaved),
        ...buildCardData(saved?.TicketSaved),
        ...buildCardData(saved?.TransitSaved),
        ...buildCardData(saved?.TextbookSaved),
        ...buildCardData(saved?.ParkingSaved),
        ...buildCardData(saved?.MiscSaved)
    ];

    if (onlyIds) {
        const ids = allCardData.map(datum => datum.id);
        return new Response(JSON.stringify(ids), {status: 200})
    } else {
        return new Response(JSON.stringify(allCardData), {status: 200});
    }

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({}), {status: 500});
    }

}