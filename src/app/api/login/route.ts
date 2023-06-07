import * as bcrypt from 'bcrypt';
import { prisma } from '../../../lib/db'
import { signJwtAccessToken } from '@/src/lib/jwt';

interface loginRequest {
    username: string,
    password: string
}

export async function POST(request: Request) {
    const body: loginRequest = await request.json();
    const user = await prisma.user.findFirst({
        where: {
            username: body.username
        }
    });
    if (user && (await bcrypt.compare(body.password, user.password))) {
        const {password, ...userWithoutPass} = user;
        const accessToken = signJwtAccessToken(userWithoutPass);
        const result = {
            ...userWithoutPass,
            accessToken
        };
        return new Response(JSON.stringify(result));
    } else {
        return new Response(JSON.stringify(null));
    }
    
}