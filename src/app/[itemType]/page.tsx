"use client"
import Card from "@/src/components/Card";
import { useEffect, useState } from "react";
import { CardData } from "@/src/lib/types/interfaces";
import { typeRangeMap } from "@/src/lib/maps";
import { CheckBoxes } from "@/src/components/filters/CheckBoxes";
import { Ranges } from "@/src/components/filters/Ranges";



export default function Page({params}: {params: {itemType: string}}) {

    const [skipCount, setSkipCount] = useState(0);
    const [data, setData] = useState<CardData[]>([]);

    const [filters, setFilters] = useState<Array<[string, string]>>([]);
    const [ranges, setRanges] = useState<Array<[string, number[]]>>(() => {
        const initRangeState: [string, number[]][] = [];
        const rangeLabels = typeRangeMap.get(params.itemType);
        rangeLabels?.forEach((label) => initRangeState.push([label, [0, 100]]));
        return initRangeState;
    });

    const handleToggleFilter = (e: React.MouseEvent<HTMLInputElement>) => {
        const box = e.target as HTMLInputElement;
        const key: string | null = box.getAttribute('name');
        const val: string | null = box.getAttribute('value');

        if (box.checked === true) {
            if (key && val) setFilters((prev) => [...prev, [key, val]]);
        } else {
            setFilters((prev) => {
                let [[key, val], ...rest] = prev;
                return rest;
            });
        }
    }

    console.log("checkboxes: ", filters);
    console.log('ranges: ', ranges);

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
                    <div className="bg-white rounded w-full px-4 py-2 h-fit flex flex-col">
                        <CheckBoxes itemType={params.itemType} handler={handleToggleFilter} />
                        <Ranges itemType={params.itemType} handler={setRanges} />
                        <button className='w-20 bg-blue-600 text-white hover:bg-blue-400 rounded'>Apply</button>
                    </div>
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


