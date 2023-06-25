"use client"

import Card from "@/src/components/Card";
import { useState, useEffect, useRef } from "react";
import { ItemData, typeKeyMap, typeQuestionMap } from "@/src/lib/types/models";
import { ItemType } from "@/src/lib/types/models";
import SellForm from "@/src/components/forms/SellForm";
import { useSearchParams } from 'next/navigation'


    export default function Page() {

        const [data, setData] = useState<ItemData>(new ItemData());
        const params = useSearchParams();

       const assignType = () => {
        switch (params.get('t')) {
            case 'sublease': {

            }
            case 'textbook': {
                setData((prev) => {
                    let newData: Partial<ItemData> = {...prev};
                    newData.type = ItemType.Textbook;
                    newData.visibleKeys = typeKeyMap.get(ItemType.Textbook);
                    newData.sellQuestions = typeQuestionMap.get(ItemType.Textbook);
                    newData.visibleValues = new Array(newData.visibleKeys?.length);
                    newData.getCardData = prev.getCardData;
                    return newData as ItemData;
                })
            }
            case 'transit': {

            }
            case 'parking': {

            }
            case 'ticket': {

            }
            case 'misc': {

            }
        };
       }

        useEffect(() => {
            assignType();
        }, [])

        if (data.type === ItemType.UnResolved) {
            assignType()
            return (<></>);
        }

        

        const cardData = data.getCardData();
        console.log(cardData);

        return (
            <div className="h-screen items-center overflow-clip">

                <div className="h-1/2 overflow-scroll">
                    <SellForm data={data} setData={setData}/>
                </div>
            
                <div className=" h-1/2 overflow-clip w-1/2 mx-auto">
                    <div className="mx-auto p-2">
                        {
                            data ? <Card data={cardData}/> : <Card data={{}} />
                        }
                    </div>
                </div>
                
            </div>
        )
    }
