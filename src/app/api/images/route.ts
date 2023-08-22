
import * as cloudinary from 'cloudinary'

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

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };
  
cloudinary.v2.config(cloudinaryConfig);

export async function fetchImageIds(folder: string) {
    try {
        const res = await cloudinary.v2.api.resources({
            type: "upload",
            prefix: folder,
            max_results: 4,
        });
        console.log('RES: ', res);
        const publicIDs: string[] = res.resources.map((resource: any) => resource.public_id);
        console.log("IDS: ", publicIDs);
        return publicIDs;
    } catch (error) {
        console.log(error);
    }
}

