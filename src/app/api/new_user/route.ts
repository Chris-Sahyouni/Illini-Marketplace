import * as bcrypt from 'bcrypt';
import { prisma } from '../../../lib/db';
import { newUserRequest } from '@/src/lib/utilities';


export async function POST(request: Request) {
    const body: newUserRequest = await request.json();
    const user = await prisma.user.create({
        data: {
            netId: body.netId,
            email: body.email,
            password: await bcrypt.hash(body.password, 10)
        }
    });

    const {password, ...result} = user;
    return new Response(JSON.stringify(result)); 
}

