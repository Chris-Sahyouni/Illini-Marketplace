"use client"

import { ItemData, } from "@/src/lib/types/models";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import ImageUpload from "../ImageUpload";
import { useSession } from "next-auth/react";
import { ItemType } from "@/src/lib/maps";


interface SellProps {
    data: ItemData;
    setData: Dispatch<SetStateAction<ItemData>>
    setHasEdited: Dispatch<SetStateAction<boolean>>
    setNumImages: Dispatch<SetStateAction<number>>;
    imgId: string
    notes: string;
    setNotes: Dispatch<SetStateAction<string>>
}

export default function SellForm({data, setData, setHasEdited, imgId, setNumImages, notes, setNotes}: SellProps) {

    const { data:session } = useSession();
    const [maxImages, setMaxImages] = useState(data.type === ItemType.Sublease ? 4 : 1);

    const questions = data.sellQuestions;

    const handleSelectInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setHasEdited(true);
        const idStr: string | null = e.target.getAttribute('id');
        const idx: number = Number(idStr);
        setData((prev) => {
            let updated: Partial<ItemData> = {...prev};
             console.log(updated.visibleValues)
            if (updated.visibleValues !== undefined) updated.visibleValues[idx] = e.target.value;
            return updated as ItemData;
        });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasEdited(true);
        const idStr: string | null = e.target.getAttribute('id');
        const idx: number = Number(idStr);
        const questionPair = questions ? questions[idx] : undefined;
        const question = questionPair ? questionPair[0] : undefined;

        if (!validateRollingInput(e.target.value, question)) return;
        setData((prev) => {
            let updated: Partial<ItemData> = {...prev};
            if (updated.visibleValues !== undefined) updated.visibleValues[idx] = e.target.value;
            return updated as ItemData;
        });
    }

    useEffect(() => {
        let i: number = -1;
        if (data.visibleKeys) {
            for (let k = 0; k < data.visibleKeys.length; k++) {
                if (data.visibleKeys[k] === 'contact') {
                    i = k;
                    break;
                }
            }
        }
        if (i >= 0) data.visibleValues[i] = session?.user.contact || '';
    }, [])


    return (
        <div className="bg-white rounded w-1/2 h-full flex mx-auto flex-row p-3 columns-2 overflow-y-scroll my-2">
            <div className="w-1/2">
            {
                questions?.map((question, index) => {
                    const options = shouldRenderSelect(question[0]);
                    return (
                        <div className="p-2" key={`div${index}`}>
                            <h1 key={`h${index}`}>{question[0]}</h1>
                            {
                                options ? <select className="outline rounded w-5/6 p-1" value={data.visibleValues[index] ? data.visibleValues[index] : ""} onChange={handleSelectInputChange} id={index.toString()}>
                                    {
                                        options.map((option) => {
                                            return <option className="outline" key={option} value={option}>{option}</option>
                                        })
                                    }
                                </select>
                                :
                                <input className="outline w-5/6 rounded-sm p-1 valid:border-green-500 invalid:border-red-600 " placeholder={question[1]} key={`input${index}`} id={index.toString()} value={data.visibleValues[index] ? data.visibleValues[index] : ""} onChange={handleInputChange}/>
                            }
                        </div>
                    );
                })
            }
            <div className="p-2 break-words">
                <h1>Anything else you want to add</h1>
                <input className="outline w-5/6 rounded-sm p-1 valid:border-green-500 invalid:border-red-600 " value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={90} />
            </div>
            </div>
            <div className=" w-1/2 justify-center flex ">
                <ImageUpload imageId={imgId} index={1} max={maxImages} setImgIndex={setNumImages}/>
            </div>
        </div>
    );
}


/* ----------------------------- Form Validation ---------------------------- */


function validateRollingInput(input: string, question: string | undefined) {
    if (question === undefined || input === undefined) return false;
    question = question.trim().toUpperCase();

    if (question.includes("INFORMATION")) {
        if (input.length >= 50) return false;
    } else {
        if (input.length >= 17) return false;
    }

    if (
        question === "PRICE"
     || question === "AMOUNT"
     || question === 'RENT (PER PERSON/MONTH)'
     || question.includes('BEDROOMS')
     || question.includes('BATHROOMS')
     )
    {
        const numbersOnlyRegEx = /^[0-9]*$/
        return numbersOnlyRegEx.test(input);
    }

    if (question.includes('DATE')) {
        if (input === '') return true;
        const i = input.length - 1;
        const format = 'YYYY-MM-DD'
        if (input.length > format.length) return false;
        if ('YMD'.includes(format[i])) {
            return /^[0-9]*$/.test(input[i]);
        } else {
            return input[i] === "-";
        }
    }

    if (question === "TIME") {
        if (input === '') return true;
        // const timeRegEx = /^(1[012]|[1-9]):[0-5][0-9][ap]m$/
        const format1 = 'H:Mmxy';
        const format2 = 'Hh:Mmxy';
        const i = input.length - 1;
        const c = input[i];
        if (/^[1-9]*$/.test(input[0]) === false) return false;
        if (input.length === 1) return true;
        if ('012'.includes(input[1])) {
            // format 2
            switch (format2[i]) {
                case "h": return input[0] === '1';
                case ':': return c === ':'
                case 'M': return '012345'.includes(c);
                case 'm': return '0123456789'.includes(c);
                case 'x': return 'ap'.includes(c);
                case 'y': return c === 'm';
            }
        } else if (input[1] === ':') {
            // format 1
            switch (format1[i]) {
                case "h": return input[0] === '1';
                case ':': return c === ':'
                case 'M': return '012345'.includes(c);
                case 'm': return '0123456789'.includes(c);
                case 'x': return 'ap'.includes(c);
                case 'y': return c === 'm';
            }
        } else {
            return false;
        }
    }

    return true;
}

function shouldRenderSelect(question: string | undefined) {
    if (question === undefined) return undefined;
    question  = question.trim().toUpperCase();

    if (question.includes('MODE')) {
        return ['Peoria Charter', 'Amtrack', 'other'];
    }
    if (question.includes("TERM")) {
        return ['fall', 'spring', 'summer'];
    }
    if (question.includes('EVENT')) {
        return ['football', 'basketball', 'concert', 'other'];
    }
    return undefined;
}