"use client"
import Card from "@/src/components/Card";
import { useEffect, useState, useContext } from "react";
import { CardData } from "@/src/lib/types/interfaces";
import { typeRangeMap } from "@/src/lib/maps";
import { CheckBoxes } from "@/src/components/filters/CheckBoxes";
import { Ranges } from "@/src/components/filters/Ranges";
import SubleaseCard from "@/src/components/SubleaseCard";
import { SearchContext } from "@/src/components/SearchProvider";



export default function Page({params}: {params: {itemType: string}}) {

    const [skipCount, setSkipCount] = useState(0);
    const [data, setData] = useState<CardData[]>([]);


    const [filters, setFilters] = useState<Array<[string, string]>>([]);
    const [ranges, setRanges] = useState<Array<[string, number[]]>>(() => {
        const initRangeState: [string, number[]][] = [];
        const rangeLabels = typeRangeMap.get(params.itemType);
        rangeLabels?.forEach((label) => initRangeState.push([label, [0, 1000]]));
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

    const searchContext = useContext(SearchContext);


    useEffect(() => {

        if (searchContext.trigger) {
            console.log('search triggered');
            if (params.itemType === undefined) return;
            
            const searchWrapper = async () => {
                const newItems: CardData[] = await requestBySearch(params.itemType, searchContext.content);
                if (newItems.length === 0 || newItems === undefined || newItems === null) {
                    console.log('invalid');
                    return;
                }
                console.log(newItems);
                setData((prevState: CardData[]) => [...newItems]);
               // setSkipCount((prev) => prev + 1)
            }
            searchWrapper();
            searchContext.setTrigger(false);

        } else {
            const wrapper = async () => {
                const newItems: CardData[] = await requestItems(params.itemType, skipCount, filters, ranges);
                if (newItems.length === 0 || newItems === undefined || newItems === null) {
                    console.log('invalid');
                    return;
                }
                console.log(newItems);
                setData((prevState: CardData[]) => [...newItems]);
            // setSkipCount((prev) => prev + 1)
            }
            wrapper();
        }

    }, [params.itemType, searchContext.trigger]);


    const applyFilters = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newItems: CardData[] = await requestItems(params.itemType, skipCount, filters, ranges);
        setData((prevState: CardData[]) => [...newItems]);
    }

        /* -------------------------------------------------------------------------- */

        return (
            <div className="h-screen flex flex-row">
                <div className="w-1/4 py-4 px-3">
                    <div className="bg-white rounded w-full px-4 py-2 h-fit flex flex-col">
                        <CheckBoxes itemType={params.itemType} handler={handleToggleFilter} />
                        <Ranges itemType={params.itemType} handler={setRanges} />
                        <button className='w-20 bg-blue-600 text-white hover:bg-blue-400 rounded' type="button" onClick={applyFilters}>Apply</button>
                    </div>
                </div>
                <div className=" w-1/2 items-center flex flex-col mx-auto p-2 overflow-scroll">
                    {
                        data.map((itemData: CardData, index: number) => {
                            return (
                                <div key={index} className="w-full py-2">
                                    {
                                        (params.itemType === 'sublease') ? <SubleaseCard data={itemData} key={itemData.id} /> : <Card data={itemData} key={itemData.id} isUploaded={true} itemId={itemData.id ? itemData.id : ""} />
                                    }
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

async function requestItems(type: string, skipCount: number, filters: [string, string][], ranges: [string, number[]][])  {
    const data = await fetch(`api/items/${type}`, {
        method: "POST",
        body: JSON.stringify({
            skipCount: skipCount,
            filters: filters,
            ranges: ranges
        }),
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json",
        }
    });
    console.log(data);
    const parsed: CardData[] = await data.json();
    return parsed;

}

async function requestBySearch(type: string, search: string) {

    const data = await fetch('api/search', {
        method: "POST",
        body: JSON.stringify({
            type: type,
            search: search
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    const parsed: CardData[] = await data.json();
    return parsed;
}


