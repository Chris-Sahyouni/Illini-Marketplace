import * as cloudinary from 'cloudinary';

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
        const publicIDs: string[] = res.resources.map((resource: any) => resource.public_id);
        return publicIDs;
    } catch (error) {
        console.log(error);
    }
}

// true means image is fine, false means not
export async function moderateImage(imageUrl: string, apiKey: string) {

    console.log(imageUrl);
    const res = await fetch(`https://im-api1.webpurify.com/services/rest/?api_key=${apiKey}&format=json&method=webpurify.aim.imgcheck&cats=nudity,wad,offensive,gore,text&imgurl=${imageUrl}`);
    const body = await res.json();
    console.log('moderate image: ', res);
    console.log('moderate image: ', body);
    const {nudity, nudityPartial, weapon, alcohol, drugs, offensive, gore} = body;
    return weapon < 50 && gore < 50 && alcohol < 50 && drugs < 40 && nudity < 40 && nudityPartial < 40 && offensive < 65;
}
