"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardData } from "@/src/lib/types/interfaces";
import { ItemType } from "@/src/lib/maps";
import SubleaseCard from "@/src/components/SubleaseCard";
import Card from "@/src/components/Card"


export default function Page() {


    const [items, setItems] = useState<CardData[]>([]);
    const { data:session } = useSession();

    useEffect(() => {

        const wrapper = async () => {

            const data = await requestItems(session?.user.id || '');
            if (data.length === 0 || data === undefined || data === null) {
                return;
            }
            console.log("data:", data);
            setItems([...data])

        }

        wrapper();
    }, [session?.user.id]);

    return (
        <div className="w-3/5 outline items-center flex flex-col ml-8 p-2 overflow-scroll">
            { items ?
                items.map((item: CardData, index: number) => {
                    return (
                        <div key={index} className="w-full py-2">
                            {
                                item.type === ItemType.Sublease ? <SubleaseCard data={item} key={item.id} /> : <Card data={item} isUploaded={true} itemId={item.id ? item.id : ''} key={item.id}/>
                            }
                        </div>
                    );
                }) : <></>
            }
        </div>
    );
}

async function requestItems(id: string) {

    if (id === '') {
        return [];
    }

    const res = await fetch('http://localhost:3000/api/user-selling', {
        method: "POST",
        body: JSON.stringify({id: id}),
        headers: {
            'Content-Type': "application/json",
            'Accept': 'application/json'
        }
    });

    console.log(res);
    const parsed: CardData[] = await res.json();
    return parsed;
}

// async function requestItems(type: string, skipCount: number, filters: [string, string][], ranges: [string, number[]][])  {
//     const data = await fetch(`api/items/${type}`, {
//         method: "POST",
//         body: JSON.stringify({
//             skipCount: skipCount,
//             filters: filters,
//             ranges: ranges
//         }),
//         headers: {
//             "Content-Type": "application/json",
//             'Accept': "application/json",
//         }
//     });
    
//     const parsed: CardData[] = await data.json();
//     return parsed;

// }