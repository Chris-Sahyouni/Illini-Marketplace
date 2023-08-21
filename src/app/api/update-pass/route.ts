import { prisma } from "../../../lib/db";
import * as bcrypt from "bcrypt";

export async function POST(request: Request) {
    const { newpass, id } = await request.json();
    try {
        const res = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                password: await bcrypt.hash(newpass, 10)
            }
        });
        return new Response(JSON.stringify(res), {status: 200})
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), {status: 500});
    }

}