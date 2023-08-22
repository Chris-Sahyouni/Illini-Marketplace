"use client"

import Image from "next/image";
import { CardData } from "../../lib/types/interfaces";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Field from "./Field";
import CardImage from "./CardImage";

interface ItemProps {
    data: CardData
    itemId: string
    initSave: boolean | undefined
    numUploaded: number
}

export default function SubleaseCard({data, itemId, initSave, numUploaded}: ItemProps) {

    const { data:session } = useSession();
    const [isSaved, setIsSaved] = useState(initSave);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>(['', '', '', '']);

    useEffect(() => {
        const wrapper = async () => {
            setLoading(true)
            const res = await fetch('http://localhost:3000/api/images', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    id: itemId
                })
            });
            const images: string[] = await res.json();
            console.log(images);
            setImages(images);
            setLoading(false);
        }
        if (numUploaded > 0) wrapper();
    }, [numUploaded])

    const handleToggleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (initSave === undefined) return;
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
        <div className=" w-full h-60 rounded-xl flex-row bg-white p-2 flex">
            <div className=" w-1/3 grid grid-cols-2 grid-rows-2">
                <div className="w-full h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80">
                    <CardImage id={images[0]} isUploaded={images[0] !== ''} />
                </div>
                <div className="w-full h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80">
                    <CardImage id={images[1]} isUploaded={images[1] !== ''} />
                </div>
                <div className="w-full h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80">
                    <CardImage id={images[2]} isUploaded={images[2] !== ''} />
                </div>
                <div className="w-full h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80">
                    <CardImage id={images[3]} isUploaded={images[3] !== ''} />
                </div>
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
                <div className="h-5/6 "></div>
                <button type="button" onClick={handleToggleSave}>
                    <Image src={isSaved ? '/bookmark_icon_filled.png' : '/bookmark_icon.png'} alt='bkmrk' width={15} height={15} className=''/>
                </button>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
