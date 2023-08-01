"use client"

import Card from "@/src/components/Card";
import { useState, useEffect } from "react";
import SellForm from "@/src/components/forms/SellForm";
import { useSearchParams } from 'next/navigation'
import { creationRequest } from "@/src/lib/types/interfaces";
import { useSession } from "next-auth/react";
import { ItemType, typeKeyMap, typeQuestionMap } from "@/src/lib/maps";
import { ItemData } from "@/src/lib/types/models";
import SubleaseCard from "@/src/components/SubleaseCard";
import {v4 as uuidv4} from "uuid";


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
        const [hasEdited, setHasEdited] = useState(false);
        const [itemId, setItemId] = useState(uuidv4());
        const [isUploaded, setIsUploaded] = useState(false)


        const initData = (itemType: ItemType) => {
            setData((prev) => {
                let newData: Partial<ItemData> = {...prev};
                newData.type = itemType;
                newData.visibleKeys = typeKeyMap.get(itemType);
                newData.sellQuestions = typeQuestionMap.get(itemType);
                newData.visibleValues = new Array(newData.visibleKeys?.length);
                newData.getCardData = prev.getCardData;
                return newData as ItemData;
            })
        }

       const assignType = () => {
        console.log('here')
        switch (params.get('t')) {
            case 'sublease': {
                initData(ItemType.Sublease);
                break;
            }
            case 'textbook': {
                initData(ItemType.Textbook)
                break;
            }
            case 'transit': {
                initData(ItemType.Transit);
                break;
            }
            case 'parking': {
                initData(ItemType.Parking);
                break;
            }
            case 'ticket': {
                initData(ItemType.Ticket);
                break;
            }
            case 'misc': {
                initData(ItemType.Misc);
                break;
            }
        };
       }

        useEffect(() => {
            assignType();
            console.log('items Id is: ' + itemId);
        }, [])

        if (data.type === ItemType.UnResolved) {
            assignType()
            return (<></>);
        }

        // there should be lots of checks here before the request even gets sent
        const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

            setStatus(Status.Loading);

            if (session && session.user && session.user.id) {
                const req: creationRequest = {
                    data: data,
                    sellerId: session.user.id,
                    id: itemId
                }

                fetch(`/api/create/${params.get('t')}`, {
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
                    <SellForm data={data} setData={setData} setHasEdited={setHasEdited} imgId={itemId} setIsUploaded={setIsUploaded}/>
                </div>

                <div className="w-full flex flex-row">
                    <div className="w-1/4"></div>
                    <div className=" h-1/2 w-1/2">
                        <div className="p-2">
                            {
                                params.get('t') === 'sublease' ? <SubleaseCard data={data ? data.getCardData() : {} } /> : <Card data={data ? data.getCardData() : {} } isUploaded={isUploaded} itemId={itemId}/>
                            }
                        </div>
                    </div>
                    {/*for this button disabled, the button does not get disabled until the sell form inputs become controlled, fix this*/}
                    <button className="ml-8 bg-blue-600 h-fit my-auto p-4 rounded-lg text-white" type="button" disabled={data.visibleValues.includes("") || !hasEdited} onClick={handleSubmit}>submit</button>
                </div>

            </div>
        )
    }
