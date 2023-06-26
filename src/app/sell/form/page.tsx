"use client"

import Card from "@/src/components/Card";
import { useState, useEffect, useRef } from "react";
import { ItemData, typeKeyMap, typeQuestionMap } from "@/src/lib/types/models";
import { ItemType } from "@/src/lib/types/models";
import SellForm from "@/src/components/forms/SellForm";
import { useSearchParams } from 'next/navigation'
import { creationRequest } from "@/src/lib/types/interfaces";
import { useSession } from "next-auth/react";


    export default function Page() {

        enum Status {
            Success,
            Failure,
            Loading,
            NotYetRequested
        }

        const [data, setData] = useState<ItemData>(new ItemData());
        const params = useSearchParams();
        const  { data:session } = useSession();
        const [status, setStatus] = useState(Status.NotYetRequested);

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


        const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

            setStatus(Status.Loading);

            if (session && session.user && session.user.id) {
                const req: creationRequest = {
                    data: data,
                    sellerId: session.user.id
                }

                fetch('/api/create', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(req)
                }).then((res: Response) => {
                    if (res.status === 200) {
                        setStatus(Status.Success);
                        console.log('success');
                    } else {
                        setStatus(Status.Failure);
                        console.log("failure");
                    }
                })
            }
        }


        return (
            <div className="h-screen">

                <div className="h-1/2 overflow-scroll">
                    <SellForm data={data} setData={setData}/>
                </div>

                <div className="w-full flex flex-row">
                    <div className="w-1/4"></div>
                    <div className=" h-1/2 w-1/2">
                        <div className="p-2">
                            {
                                data ? <Card data={data.getCardData()}/> : <Card data={{}} />
                            }
                        </div>
                    </div>
                    {/*for this button disabled, the button does not get disabled until the sell form inputs become controlled, fix this*/}
                    <button className="ml-8 bg-blue-600 h-fit my-auto p-4 rounded-lg text-white" type="button" disabled={data.visibleValues.includes("")} onClick={handleSubmit}>submit</button>
                </div>

            </div>
        )
    }
