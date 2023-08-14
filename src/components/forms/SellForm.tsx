"use client"

import { ItemData, } from "@/src/lib/types/models";
import { useState, Dispatch, SetStateAction } from "react";
import ImageUpload from "../ImageUpload";


interface SellProps {
    data: ItemData;
    setData: Dispatch<SetStateAction<ItemData>>
    setHasEdited: Dispatch<SetStateAction<boolean>>
    setIsUploaded: Dispatch<SetStateAction<boolean>>;
    imgId: string
}

export default function SellForm({data, setData, setHasEdited, imgId, setIsUploaded}: SellProps) {


    // const questions = typeQuestionMap.get(data.type);
    const questions = data.sellQuestions;
    console.log(data);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasEdited(true);
        const idStr: string | null = e.target.getAttribute('id');
        const idx: number = Number(idStr);
        setData((prev) => {
            let updated: Partial<ItemData> = {...prev};
            if (updated.visibleValues !== undefined) updated.visibleValues[idx] = e.target.value;
            return updated as ItemData;
        });

    }


    return (
        <div className="bg-white rounded w-1/2 h-full flex mx-auto flex-row p-3 columns-2 overflow-y-scroll my-2">
            <div className="w-1/2">
            {
                questions?.map((question, index) => {
                    return (
                        <div className="p-2" key={`div${index}`}>
                            <h1 key={`h${index}`}>{question[0]}</h1>
                            <input className="outline w-5/6 rounded-sm p-1" placeholder={question[1]} key={`input${index}`} id={index.toString()} value={data.visibleValues[index] ? data.visibleValues[index] : ""} onChange={handleInputChange}/>
                        </div>
                    );
                })
            }
            </div>
            <div className=" w-1/2 justify-center flex ">
                <ImageUpload imageId={imgId} setIsUploaded={setIsUploaded}/>
            </div>
        </div>
    );
}