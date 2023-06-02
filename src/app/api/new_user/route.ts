import * as bcrypt from 'bcrypt';
import { prisma } from '../../../db';

interface newUserRequest {
    username: string;
    password: string;
    email: string;
}

export async function POST(request: Request) {
    const body: newUserRequest = await request.json();
    const user = await prisma.user.create({
        data: {
            name: body.username,
            email: body.email,
            password: await bcrypt.hash(body.password, 10)
        }
    });

    const {password, ...result} = user;
    return new Response(JSON.stringify(result)); 
}

