'use client'

import { CardData } from "../../lib/types/interfaces";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Field from "./Field";
import CardImage from "./CardImage";
import { CircularProgress } from "@mui/material";
import { ItemType } from "@/src/lib/maps";

interface ItemProps {
    data: CardData
    isUploaded: boolean
    itemId: string
    initSave: boolean | undefined
    sellNotes?: string
}

export default function Card({data, isUploaded, itemId, initSave, sellNotes}: ItemProps) {

    const {data:session} = useSession();

    const [isSaved, setIsSaved] = useState(initSave);
    const [loading, setLoading] = useState(false);
    const [imageId, setImageId] = useState('')
    const [padding, setPadding] = useState(1)

    useEffect(() => {
      switch (data.type) {
        case ItemType.Textbook: {
            setPadding(2);
            break;
        }
        case ItemType.Transit: {
            setPadding(0);
            break;
        }
        case ItemType.Ticket: {
            setPadding(1);
            break;
        }
        case ItemType.Parking: {
            setPadding(1);
            break;
        }
        case ItemType.Misc: {
            setPadding(2);
            break;
        }
      }
    }, [])

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
            if (images.length > 0) setImageId(images[0]);
            setLoading(false);
        }
        if (isUploaded) wrapper();
    }, [isUploaded])

    const handleToggleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (initSave === undefined) return;
        setIsSaved(!isSaved);
        // note the state has NOT updated yet at this point because state update is not synchronous
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
        <div className=" w-full h-40 rounded-xl flex-row bg-white p-2 flex">
            <div className="w-1/4 h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80 overflow-clip">
                {
                    loading
                    ? <CircularProgress size={50} />
                    : <CardImage id={imageId} isUploaded={isUploaded} />
                }
            </div>

            <div className="px-2 w-3/4 pl-4 rows-2">
                <div className="columns-2 h-3/4">
                        {
                            data.keys?.map((field, index) => {
                                const val: string | undefined = data.values?.at(index);
                                return (
                                    <Field name={field} value={val ? val : ""} index={index} key={field} padding={padding}/>
                                );
                            })
                        }
                </div>
                <div className="break-words w-full overflow-scroll">
                    {sellNotes ? sellNotes : data.notes}
                </div>
            </div>
            <div>
                <div className="h-5/6"></div>
                <button type="button" onClick={handleToggleSave}>
                    <Image src={isSaved ? '/bookmark_icon_filled.png' : '/bookmark_icon.png'} alt='bkmrk' width={15} height={15} />
                </button>
            </div>
        </div>
    );
}


