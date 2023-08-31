"use client"

import Card from "@/src/components/Card Related/Card";
import { useState, useEffect, useContext } from "react";
import SellForm from "@/src/components/forms/SellForm";
import { useSearchParams } from 'next/navigation'
import { creationRequest } from "@/src/lib/types/interfaces";
import { useSession } from "next-auth/react";
import { ItemType, typeKeyMap, typeQuestionMap } from "@/src/lib/maps";
import { ItemData } from "@/src/lib/types/models";
import SubleaseCard from "@/src/components/Card Related/SubleaseCard";
import {v4 as uuidv4} from "uuid";
import { CircularProgress } from "@mui/material";
import { SellContext } from "@/src/components/providers/SellProvider";


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
        const [itemId, setItemId] = useState('');
        const [uuidGenerated, setUuidGenerated] = useState(false)
        const [notes, setNotes] = useState("")
        const [canSubmit, setCanSubmit] = useState(false)

        const context = useContext(SellContext);

        if (!uuidGenerated) {
            setItemId(uuidv4());
            setUuidGenerated(true);
        }


        const initData = (itemType: ItemType) => {
            setData((prev) => {
                let newData: Partial<ItemData> = {...prev};
                newData.type = itemType;
                newData.visibleKeys = typeKeyMap.get(itemType);
                newData.sellQuestions = typeQuestionMap.get(itemType);
                newData.visibleValues = new Array(newData.visibleKeys?.length);
                for (let i = 0; i < newData.visibleValues.length; i++) newData.visibleValues[i] = "";
                newData.getCardData = prev.getCardData;
                return newData as ItemData;
            })
        }

       const assignType = () => {
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
        }, [])

        if (status === Status.Loading) {
            return (
                <div className="flex justify-center my-4">
                    <CircularProgress size={50} />
                </div>
            );
        }

        if (status == Status.Success) {
            return (
                <div className="flex justify-center my-4">
                    <div className="flex-col bg-white w-2/5 py-4 px-3 items-center text-center rounded">
                        <h1 className="font-bold text-lg">Success</h1>
                        <p className="mt-4 ">You can always edit your listing later</p>
                    </div>
                </div>
            );
        }

        if (data.type === ItemType.UnResolved) {
            assignType()
            return (
                <></>
            );
        }

        const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

            setStatus(Status.Loading);

            if (session && session.user && session.user.id) {
                const req: creationRequest = {
                    data: data,
                    sellerId: session.user.id,
                    id: itemId,
                    numImages: context.numImages,
                    notes: data.notes
                }

                fetch(`https://illinimarketplace.com/api/create/${params.get('t')}`, {
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
                    <SellForm data={data} setData={setData} setHasEdited={setHasEdited} imgId={itemId} notes={notes} setNotes={setNotes} setCanSubmit={setCanSubmit} />
                </div>
                <div className="w-full flex flex-row">
                    <div className="w-1/4"></div>
                    <div className=" h-1/2 w-1/2">
                        <div className="p-2">
                            {
                                params.get('t') === 'sublease' ? <SubleaseCard data={data ? data.getCardData() : {id: '', numImages: 0, notes: ""} } itemId={itemId} initSave={undefined} numUploaded={context.numImages} sellNotes={notes} /> : <Card data={data ? data.getCardData() : {numImages: context.numImages, id: '', notes: ""} } isUploaded={context.numImages > 0} itemId={itemId} initSave={undefined} sellNotes={notes} />
                            }
                        </div>
                    </div>
                    <button className="ml-8 bg-gradient-radial from-blue-400 to-blue-600 hover:from-blue-200 hover:to-blue-400 disabled:from-gray-400 disabled:to-gray-600 h-fit my-auto p-4 rounded-lg text-white" type="button" disabled={!canSubmit} onClick={handleSubmit}>submit</button>
                </div>

            </div>
        )
    }

