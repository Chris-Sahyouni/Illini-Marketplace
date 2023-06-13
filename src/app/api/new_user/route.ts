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
    const magicLink= `http://localhost:3000/account/${user.id}`;

    transporter.sendMail({
        to: body.email,
        from: "no-reply@illinimarketplace.com",
        subject: "Please verify your email address",
        // give this some html
        text: `Follow this link to verify your account: ${magicLink}`,
    },
    (err) => {
        console.log(err?.message);
    });

    const {password, ...result} = user;
    return new Response(JSON.stringify(result)); 
}

