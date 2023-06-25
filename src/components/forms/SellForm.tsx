import { ItemData, ItemType, typeQuestionMap } from "@/src/lib/types/models";
import { useState, Dispatch, SetStateAction } from "react";
interface SellProps {
    data: ItemData;
    setData: Dispatch<SetStateAction<ItemData>>
}

export default function SellForm({data, setData}: SellProps) {

    const questions = data.sellQuestions;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const idStr: string | null = e.target.getAttribute('id');
        const idx: number = Number(idStr);
        setData((prev) => {
            let updated: Partial<ItemData> = {...prev};
            if (updated.visibleValues !== undefined) updated.visibleValues[idx] = e.target.value;
            return updated as ItemData;
        });

    }


    return (
        <div className="bg-white rounded w-1/2 h-full flex mx-auto flex-col p-3 columns-2 overflow-y-scroll my-2">
            {
                questions?.map((question, index) => {
                    return (
                        <div className="p-2" key={`div${index}`}>
                            <h1 key={`h${index}`}>{question[0]}</h1>
                            <input className="outline w-1/2 rounded-sm" placeholder={question[1]} key={`input${index}`} id={index.toString()} value={data.visibleValues[index]} onChange={handleInputChange}/>
                        </div>
                    );
                })
            }
        </div>
    );
}