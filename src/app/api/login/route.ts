import * as bcrypt from 'bcrypt';
import { prisma } from '../../../lib/db'

interface loginRequest {
    userNetId: string,
    password: string
}

export async function POST(request: Request) {
    const body: loginRequest = await request.json();
    const user = await prisma.user.findFirst({
        where: {
            netId: body.userNetId
        }
    });

    if (user && (await bcrypt.compare(user.password, body.password))) {
        const {password, ...userWithoutPass} = user;
        return new Response(JSON.stringify(userWithoutPass));
    } else {
        return new Response(JSON.stringify(null));
    }
    
}