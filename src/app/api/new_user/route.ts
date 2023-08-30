import * as bcrypt from 'bcrypt';
import { prisma } from '../../../lib/db';
import { newUserRequest } from '@/src/lib/types/interfaces';
import { transporter } from '@/src/lib/nodemailer';


export async function POST(request: Request) {
    const body: newUserRequest = await request.json();
    const user = await prisma.user.create({
        data: {
            username: body.username,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
        }

    });

    // this will need to change before deployment
    const magicLink= `https://illinimarketplace.com/account/verify/${user.id}`;

    transporter.sendMail({
        to: body.email,
        from: "no-reply@illinimarketplace.com",
        subject: "Please verify your email address",
        // give this some html
        text: `Follow this link to verify your account: ${magicLink}`,
    },
    (err: Error | null) => {
        console.log(err?.message);
    });

    const {password, ...result} = user;
    return new Response(JSON.stringify(result)); 
}

