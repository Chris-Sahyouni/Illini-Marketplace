import { CardData } from "../lib/types/interfaces";
import { CldImage } from 'next-cloudinary';
import Image from "next/image";

interface ItemProps {
    data: CardData
    isUploaded: boolean
    itemId: string
}

export default function Card({data, isUploaded, itemId}: ItemProps) {

if (data === undefined) return (<></>);
    return (
        <div className=" w-full h-36 rounded-xl flex-row bg-white p-2 flex">
            <div className="w-1/4 h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80">
                {
                    getImage(itemId || "", isUploaded)
                }
            </div>
            <div className="columns-2 px-2 w-3/4 pl-4">
                    {
                        data.keys?.map((field, index) => {
                            const val: string | undefined = data.values?.at(index);
                            return (
                                <Field name={field} value={val ? val : ""} index={index} key={field}/>
                            );
                        })
                    }
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */

interface fieldProps {
    name: string;
    value: string;
    index: number;
}

export function Field({name, value, index}: fieldProps) {


    return (
        <div className="flex flex-row py-2" key={index}> 
            <p className="font-bold pr-1" key={`key${index}`}>{name}:</p>
            <p key={`val${index}`}>{value}</p>
        </div>
    );
}



function getImage(cloudSrc: string, isUploaded: boolean) {
    console.log('cloud source: ' + cloudSrc + ' isUploaded: ' + isUploaded);
    if (isUploaded && cloudSrc) {

        return (
            <>
                <CldImage
                    src={cloudSrc}
                    height={130}
                    width={152}
                    crop="crop"
                    gravity="custom"
                    alt='img'
                />
            </>
        );
    }

    return (
        <>
            <Image
                src={'/placeholder.png'}
                fill={true}
                alt='img'
            />
        </>
    )
}
