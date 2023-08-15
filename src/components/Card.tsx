'use client'

import { CardData } from "../lib/types/interfaces";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { useState, useContext } from "react";
import { LightBoxContext } from "./LightBoxProvider";
import { useSession } from "next-auth/react";

interface ItemProps {
    data: CardData
    isUploaded: boolean
    itemId: string
}

export default function Card({data, isUploaded, itemId}: ItemProps) {

    const {data:session} = useSession();

    const [isSaved, setIsSaved] = useState(false);
    const handleToggleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsSaved(!isSaved);
        // note the state has NOT updated yet at this point because state update is not synchronous
        console.log('requesting');
        const res = await fetch('http://localhost:3000/api/save', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                shouldSave: !isSaved,
                type: data.type,
                userId: session?.user.id,
                itemId: itemId
            })
        });
        console.log(await res.json());
    }

    if (data === undefined) return (<></>);
    return (
        <div className=" w-full h-36 rounded-xl flex-row bg-white p-2 flex">
            <div className="w-1/4 h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80">
                <CardImage id={itemId || ''} isUploaded={isUploaded} />
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
            <div>
                <div className="h-5/6"></div>
                <button type="button" onClick={handleToggleSave}>
                    <Image src={isSaved ? '/bookmark_icon_filled.png' : '/bookmark_icon.png'} alt='bkmrk' width={15} height={15} className=''/>
                </button>
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


/* -------------------------------------------------------------------------- */


interface CardImageProps {
    id: string;
    isUploaded: boolean;
}

export  function CardImage({ id, isUploaded }: CardImageProps) {


    const context = useContext(LightBoxContext);

    if (isUploaded && id) {

        return (
            <>
                <button onClick={() => context.boxState(id)}>
                    <CldImage
                        src={id}
                        height={130}
                        width={152}
                        crop="crop"
                        gravity="custom"
                        alt='img'
                    />
                </button>
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



