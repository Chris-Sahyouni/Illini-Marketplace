"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CardData } from "@/src/lib/types/interfaces";
import { ItemType } from "@/src/lib/maps";
import SubleaseCard from "@/src/components/SubleaseCard";
import Card from "@/src/components/Card"


export default function Page() {


    const [items, setItems] = useState<CardData[]>([]);
    // const [toggleReload, setToggleReload] = useState(false);
    const { data:session } = useSession();

    useEffect(() => {

        const wrapper = async () => {
            const data = await requestItems(session?.user.id || '');
            if (data.length === 0 || data === undefined || data === null) {
                setItems([]);
                return;
            }
            setItems([...data])
        }
        wrapper();
    }, [session?.user.id]);

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const fullItemId = e.currentTarget.getAttribute('id')
        const targetId = fullItemId?.split(';')[0].trim()
        const target: CardData | undefined = items.find((item) => item.id === targetId);

        await deleteItem(targetId, target?.type).then((res) => {
            if (res) {
                const [target, ...rest] = items;
                setItems([...rest]);
            }
        })
    }

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {

    }

    return (
        <div className="w-full flex flex-col ml-8 p-2 overflow-scroll">
            { items ?
                items.map((item: CardData, index: number) => {
                    return (
                        <div key={`outer;${item.id}`} className="w-full col-2 flex">
                            <div key={index} className="w-3/5 py-2">
                                {
                                    item.type === ItemType.Sublease ? <SubleaseCard data={item} key={item.id} /> : <Card data={item} isUploaded={true} itemId={item.id ? item.id : ''} key={item.id}/>
                                }
                            </div>
                            <div className="w-1/5 my-3 ml-2 flex flex-col items-start p-2">
                                <button className="py-2 px-5 bg-gradient-radial from-blue-400 to-blue-600 hover:bg-gradient-radial hover:from-blue-300 hover:to-blue-600 text-white rounded" type="button" onClick={handleEdit} id={`${item.id};edit`}>Edit</button>
                                <button className="py-2 px-3 mt-2 bg-gradient-radial from-red-400 to-red-600 hover:bg-gradient-radial hover:from-red-300 hover:to-red-600 text-white rounded" type="button" onClick={handleDelete} id={`${item.id};delete`}>Delete</button>
                            </div>
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

    const parsed: CardData[] = await res.json();
    return parsed;
}

async function deleteItem(id: string | undefined, type: ItemType | undefined) {
    if (!id || !type) return;
    const res = await fetch('http://localhost:3000/api/delete', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({id: id, type: type})
    });

    return await res.json()
}

