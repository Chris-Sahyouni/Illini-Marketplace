"use client"

import Image from "next/image";
import { CardData } from "../../lib/types/interfaces";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Field from "./Field";
import CardImage from "./CardImage";
import { config } from "@/src/lib/url_config";

interface ItemProps {
    data: CardData
    itemId: string
    initSave: boolean | undefined
    numUploaded: number
    sellNotes?: string
}

export default function SubleaseCard({data, itemId, initSave, numUploaded, sellNotes}: ItemProps) {

    const { data:session } = useSession();
    const [isSaved, setIsSaved] = useState(initSave);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>(['', '', '', '']);
    const [imgDimensions, setImgDimensions] = useState({width: 0, height: 0,})

    const imgContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (imgContainerRef.current) {
          const { width, height } = imgContainerRef.current.getBoundingClientRect();
          setImgDimensions({ width: width/2 , height: height/2 });
        }
      }, []);


    useEffect(() => {
        const wrapper = async () => {
            setLoading(true)
            const res = await fetch(`${config.scheme}://${config.url}/api/images`, {
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
        const res = await fetch(`${config.scheme}://${config.url}/api/save`, {
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
    }

if (data === undefined) return (<></>);

    return (
        <div className=" w-full h-60 rounded-xl flex-row bg-white p-2 flex">
            <div className=" w-1/3 grid grid-cols-2 grid-rows-2" ref={imgContainerRef}>
                <div className="w-full h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80 overflow-clip">
                    <CardImage id={images[0]} isUploaded={images[0] !== ''} dimensions={imgDimensions} />
                </div>
                <div className="w-full h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80 overflow-clip">
                    <CardImage id={images[1]} isUploaded={images[1] !== ''} dimensions={imgDimensions} />
                </div>
                <div className="w-full h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80 overflow-clip">
                    <CardImage id={images[2]} isUploaded={images[2] !== ''} dimensions={imgDimensions} />
                </div>
                <div className="w-full h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80 overflow-clip">
                    <CardImage id={images[3]} isUploaded={images[3] !== ''} dimensions={imgDimensions} />
                </div>
            </div>
            <div className="px-2 w-3/4 pl-4">
                <div className="columns-2 h-3/4">
                        {
                            data.keys?.map((field, index) => {
                                const val: string | undefined = data.values?.at(index);
                                return (
                                    <Field name={field} value={val ? val : ""} index={index} key={field} padding={1} />
                                );
                            })
                        }
                </div>
                <div className="break-words w-full overflow-scroll">
                    {sellNotes ? sellNotes : data.notes}
                </div>
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
