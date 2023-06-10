
import { prisma } from '../../../lib/db';


export async function POST(request: Request) {
    try {
        const { id } = await request.json();
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                isVerified: true,
            }
        });
        return new Response('email verified', {
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return new Response("error", {
            status: 410 
        });
    }
}
