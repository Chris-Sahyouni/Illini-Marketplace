import { prisma } from '../../../lib/db'

export async function POST(request: Request) {
    const { id, newContact } = await request.json();
    try {
        const res = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                contact: newContact
            }
        });
        return new Response(JSON.stringify(res), {status: 200});
    } catch (err) {
        console.log(err);
        return new Response(null, {status: 500});
    }
}