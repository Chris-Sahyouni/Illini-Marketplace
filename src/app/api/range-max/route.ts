import { prisma } from '../../../lib/db'

export async function POST(req: Request) {
    const maxes = await prisma.rangeMaxes.findFirst();
    return new Response(JSON.stringify(maxes));
}