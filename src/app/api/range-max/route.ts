import {prisma} from '../../../lib/db'

export async function GET() {
    const maxes = await prisma.rangeMaxes.findFirst();
    console.log(maxes)
    return new Response(JSON.stringify(maxes));
}