"use client"
import Card from "@/src/components/Card";
import { useEffect, useState } from "react";
import { CardData } from "@/src/lib/types/interfaces";
import Filters from "@/src/components/Filters";


export default function Page({params}: {params: {itemType: string}}) {

    const [skipCount, setSkipCount] = useState(0);
    const [data, setData] = useState<CardData[]>([]);

    useEffect(() => {

        fetch(`api/items/${params.itemType}`, {
            method: "POST",
            body: JSON.stringify({
                skipCount: skipCount,
                filters: null
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
            }
        }).then((res: Response) => {
            console.log(res);

            res.json().then((newItems: CardData[]) => {
              setData((prevState: CardData[]) => [...prevState, ...newItems]);
            })
            
            setSkipCount((prev) => prev + 1)
        })

    }, [params.itemType]);

    if (!data || data.length === 0 || data === null || data === undefined) {
        return (<></>);
    }

        return (
            <div className="h-screen flex flex-row">
                <div className="w-1/4 py-4 px-3">
                    <Filters itemType={params.itemType}/>
                </div>
                <div className=" w-1/2 items-center flex flex-col mx-auto p-2 overflow-scroll">
                    {
                        data.map((itemData: CardData, index: number) => {
                            return (
                                <div key={index} className="w-full py-2">
                                    <Card data={itemData} key={itemData.id} />
                                </div>
                            );
                        })
                    }
                </div>
                <div className="w-1/4">

                </div>
            </div>
        );
}

/* -------------------------------------------------------------------------- */


