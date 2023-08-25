
import { fetchImageIds } from "@/src/lib/server-utils";

export async function POST(request: Request) {
    const { id } = await request.json()
    try {
        const images = await fetchImageIds(id);
        return new Response(JSON.stringify(images), {status: 200});
    } catch (error) {
        console.log('ERROR: ', error);
        return new Response(JSON.stringify([]), {status: 500});
    }
}



