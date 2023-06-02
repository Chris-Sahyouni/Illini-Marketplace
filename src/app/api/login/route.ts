import * as bcrypt from 'bcrypt';
import { prisma } from '../../../db'

interface loginRequest {
    username: string,
    password: string
}

export async function POST(request: Request) {
    const body: loginRequest = await request.json();
    const user = await prisma.user.findFirst({
        where: {
            name: body.username
        }
    });

    if (user && (await bcrypt.compare(user.password, body.password))) {
        const {password, ...userWithoutPass} = user;
        return new Response(JSON.stringify(userWithoutPass));
    } else {
        return new Response(JSON.stringify(null));
    }
    
}