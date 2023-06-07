import * as bcrypt from 'bcrypt';
import { prisma } from '../../../lib/db';
import { newUserRequest } from '@/src/lib/utilities';
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

    transporter.sendMail({
        to: body.email,
        from: "no-reply@illinimarketplace.com",
        subject: "Please verify your email address",
        text: "Follow this link to verify your account:",
    },
    (err) => {
        console.log(err);
    });

    const {password, ...result} = user;
    return new Response(JSON.stringify(result)); 
}

