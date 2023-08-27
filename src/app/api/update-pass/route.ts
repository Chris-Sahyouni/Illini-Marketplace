import { prisma } from "../../../lib/db";
import * as bcrypt from "bcrypt";
import { transporter } from "@/src/lib/nodemailer";

export async function POST(request: Request) {
    const { newpass, id = undefined, email = undefined } = await request.json();
    try {
        let res;
        const newHash = await bcrypt.hash(newpass, 10)
        if (id) {
            res = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    password: newHash
                }
            });
        } else if (email) {
            res = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    password: newHash
                }
            });
;
            console.log("NEW HASH: ", newHash);
            transporter.sendMail({
                to: email,
                from: 'no-reply@illinimarketplace.com',
                subject: "Temporary Password",
                text: `Your temporary password is: ${newpass}, you can change this after logging in from the my account page.`
            })

        }
        return new Response(JSON.stringify(res), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {status: 500});
    }

}
    /**
     * $2b$10$dsqlQhJCEsQrsHntWnA3iuBgY1YbVzu5prhmTiT8xh/WwGSRqeFJW
     * $2b$10$dsqlQhJCEsQrsHntWnA3iuBgY1YbVzu5prhmTiT8xh/WwGSRqeFJW
     */