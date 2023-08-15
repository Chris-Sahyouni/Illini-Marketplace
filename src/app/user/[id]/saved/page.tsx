"use client"

import { useEffect, useState } from "react";
import { CardData } from "@/src/lib/types/interfaces";
import { useSession } from "next-auth/react";
import { ItemType } from "@/src/lib/maps";
import Card from "@/src/components/Card";
import SubleaseCard from "@/src/components/SubleaseCard";

export default function Page() {

    const {data:session} = useSession();
    const [items, setItems] = useState<CardData[]>([]);

    useEffect(() => {
      const wrapper = async () => {
        const res = await fetch('http://localhost:3000/api/user-saved', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({id: session?.user.id})
        });
        const parsed = await res.json();
        if (parsed === undefined || parsed === null || parsed.length === 0) {
            setItems([])
        }
        setItems([...parsed]);
      }
      wrapper();
    }, [])

    return (
            <div className="w-full flex flex-col ml-8 p-2 overflow-scroll">
                { items ?
                    items.map((item: CardData, index: number) => {
                        return (
                            <div key={`outer;${item.id}`} className="w-full col-2 flex">
                                <div key={index} className="w-3/5 py-2">
                                    {
                                        item.type === ItemType.Sublease ? <SubleaseCard data={item} key={item.id} /> : <Card data={item} isUploaded={item.hasImage} itemId={item.id ? item.id : ''} key={item.id}/>
                                    }
                                </div>
                            </div>
                        );
                    }) : <></>
                }
            </div>
    );
}