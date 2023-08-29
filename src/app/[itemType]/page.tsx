"use client"

import Card from "@/src/components/Card Related/Card";
import { useEffect, useState, useContext } from "react";
import { CardData } from "@/src/lib/types/interfaces";
import { typeRangeMap } from "@/src/lib/maps";
import { CheckBoxes } from "@/src/components/filters/CheckBoxes";
import { Ranges } from "@/src/components/filters/Ranges";
import SubleaseCard from "@/src/components/Card Related/SubleaseCard";
import { SearchContext } from "@/src/components/providers/SearchProvider";
import { getUserSaves } from "@/src/lib/client-utils";
import { useSession } from "next-auth/react";
import { CircularProgress } from "@mui/material";



export default function Page({params}: {params: {itemType: string}}) {

    const { data:session } = useSession();

    const [loading, setLoading] = useState(true);

    const [skipCount, setSkipCount] = useState(0);

    const [data, setData] = useState<CardData[]>([]);

    const [initSaves, setInitSaves] = useState<string[]>([]);

    const [loadingMore, setLoadingMore] = useState(false);

    const [canLoadMore, setCanLoadMore] = useState(true);

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
        const savesWrapper = async () => {
            setLoading(true);
            const saves: string[] = await getUserSaves(session?.user.id, true);
            setLoading(false);
            setInitSaves(saves);
        }
        savesWrapper()
    }, [])


    useEffect(() => {
            if (params.itemType === undefined) return;
            setLoading(true);
            setSkipCount(0);
            const searchWrapper = async () => {
                const newItems: CardData[] = await requestBySearch(params.itemType, searchContext.content);
                if (newItems.length === 0 || newItems === undefined || newItems === null) {
                    return;
                }
                setLoading(false);
                setData((prevState: CardData[]) => [...newItems]);
                setSkipCount((prev) => prev + 1)
            }
            searchWrapper();
            searchContext.setTrigger(false);
    }, [searchContext.trigger])

    useEffect(() => {
            const wrapper = async () => {
                setLoading(true);
                const newItems: CardData[] = await requestItems(params.itemType, skipCount, filters, ranges);
                if (newItems.length === 0 || newItems === undefined || newItems === null) {
                    return;
                }
                setData((prevState: CardData[]) => [...newItems]);
                setSkipCount((prev) => prev + 1)
                setLoading(false);
            }
            wrapper();

    }, [params.itemType]);

    const handleLoadMore = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoadingMore(true);
        const newItems: CardData[] = await requestItems(params.itemType, skipCount, filters, ranges);
        if (newItems.length === 0 || newItems === undefined || newItems === null) {
            setCanLoadMore(false);
            setLoadingMore(false);
            return;
        }
        setData((prevState: CardData[]) => [...prevState, ...newItems]);
        setSkipCount((prev) => prev + 1)
        setLoadingMore(false);
    }



    const applyFilters = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setSkipCount(0);
        setLoading(true)
        const newItems: CardData[] = await requestItems(params.itemType, skipCount, filters, ranges);
        setLoading(false);
        setData((prevState: CardData[]) => [...newItems]);
    }


        /* -------------------------------------------------------------------------- */

        return (
            <div className="h-screen flex flex-row">
                <div className="w-1/4 py-4 px-3">
                    <div className="bg-white rounded w-full px-4 py-2 h-fit flex flex-col">
                        <CheckBoxes itemType={params.itemType} handler={handleToggleFilter} />
                        <Ranges itemType={params.itemType} handler={setRanges} />
                        <button className='p-1 w-20 text-white rounded bg-gradient-radial from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-400' type="button" onClick={applyFilters}>Apply</button>
                    </div>
                </div>
                <div className=" w-1/2 items-center flex flex-col mx-auto p-2 overflow-scroll">
                    {
                        !loading ?
                            data.map((itemData: CardData, index: number) => {
                                return (
                                    <div key={index} className="w-full py-2">
                                        {
                                            (params.itemType === 'sublease') 
                                            ? <SubleaseCard data={itemData} key={itemData.id} itemId={itemData.id} initSave={initSaves.includes(itemData.id)} numUploaded={itemData.numImages}  />
                                            : <Card data={itemData} key={itemData.id} isUploaded={itemData.numImages > 0} itemId={itemData.id} initSave={initSaves.includes(itemData.id)} />
                                        }
                                    </div>
                                );
                            })
                        : <div className='justify-center my-3'> <CircularProgress size={50}/>  </div>

                    }
                    {  canLoadMore ?
                        loading || data.length === 0 ? null :
                            !loadingMore ?
                                <div>
                                    <button className='p-2 w-30 text-white rounded bg-gradient-radial from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-400' type="button" onClick={handleLoadMore} disabled={!canLoadMore} >load more</button>
                                </div>
                            : <CircularProgress size={50} />
                        : null
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


