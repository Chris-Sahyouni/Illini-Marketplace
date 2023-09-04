import { CardData } from "@/src/lib/types/interfaces";
import { useContext, useState } from "react";
import { EditorContext } from "../providers/EditorProvider";
import { shouldRenderSelect } from "@/src/lib/client-utils";
import { config } from "@/src/lib/url_config";

interface EditFormProps {
    toEdit: CardData;
}

export default function EditForm({ toEdit }: EditFormProps) {

    const {openEditor} = useContext(EditorContext);
    const [editable, setEditable] = useState<CardData>(() => {
      let build: CardData = {
        keys: toEdit.keys ? [...toEdit.keys] : [],
        values: toEdit.values ? [...toEdit.values] : [],
        type: toEdit.type,
        id: toEdit.id,
        name: toEdit.name,
        numImages: toEdit.numImages,
        notes: toEdit.notes
      }
      return build;
    });

    const [validity, setValidity] = useState<string[]>(() => {
        let out: string[] = [];
        if (editable.keys) for (let i = 0; i < editable.keys.length; i++) {
            out.push('');
        }
        return out;
    })

    const keys = toEdit.keys || [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const index = Number(e.target.getAttribute('id'));
        if (editable.values) {

            let updated = {...editable};
            if (updated.values) updated.values[index] = e.target.value;
            setEditable(updated);

        }
    }

    const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editable.values) {
            setEditable((prev) => {
                let copy = {...prev};
                copy.notes = e.target.value;
                return copy;
            })
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLSelectElement>) => {
        const index = Number(e.target.getAttribute('id'));
        const key = editable.keys ? editable.keys[index] : undefined;
        const val = editable.values ? editable.values[index] : undefined;
        if (!validateOnEditBlur(val, key)) {
            let copy = [...validity];
            copy[index] = 'outline-red-500';
            setValidity(copy);
        } else {
            let copy = [...validity];
            copy[index] = '';
            setValidity(copy);
        }
    }


    const handleSave = async () => {

        const res = await fetch(`${config.scheme}://${config.url}/api/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            },
            body: JSON.stringify({item: editable})
        });
        // loading animation here
        openEditor(undefined);
        window.location.reload();
    }

    return (
        <div className="h-full w-full rounded bg-white p-3">
            {
                keys.map((key, index) => {
                    let options = shouldRenderSelect(key)
                    if (options) {
                        return (
                            <div key={`div-${key}`} className="p-1 m-1 my-2 col-2 flex">
                                <h1 key={`label-${key}`} className="font-bold text-lg p-1 ">{key}:</h1>
                                <select className={`p-1 ml-1 outline ${validity[index]} relative m-0 block w-1/3 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(10,113,202)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary`} value={editable.values ? editable.values[index] : ""} onChange={handleChange} id={index.toString()} onBlur={handleBlur} >
                                    {
                                        options.map((option) => {
                                            return <option className="outline" key={option} value={option}>{option}</option>
                                        })
                                    }
                                </select>
                            </div>
                          );
                    }

                  return (
                    <div key={`div-${key}`} className="p-1 m-1 my-2 col-2 flex">
                        <h1 key={`label-${key}`} className="font-bold text-lg p-1 ">{key}:</h1>
                        <input type="text" key={key} id={index.toString()} value={editable.values ? editable.values[index] : ''} className={`p-1 ml-1 outline ${validity[index]} relative m-0 block w-1/3 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(10,113,202)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary`} onChange={handleChange} onBlur={handleBlur} maxLength={25} />
                    </div>
                  );
                })
            }
                <div  className="p-1 m-1 my-2 col-2 flex">
                    <h1  className="font-bold text-lg p-1 ">notes:</h1>
                    <input type="text"  value={editable.notes} className="p-1 ml-1 outline relative m-0 block w-1/3 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(10,113,202)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary" onChange={handleNotesChange} maxLength={90} />
                </div>
            <div className="justify-end mt-5 p-2 flex">
                <button className="py-2 px-2 bg-gradient-radial from-red-400 to-red-600 hover:bg-gradient-radial hover:from-red-300 hover:to-red-600 text-white rounded" onClick={() => openEditor(undefined)}>Discard</button>
                <button className="ml-2 py-2 px-2 bg-gradient-radial from-blue-400 to-blue-600 hover:bg-gradient-radial hover:from-blue-300 hover:to-blue-600 text-white rounded" onClick={handleSave} disabled={validity.includes('outline-red-500')} >Save Changes</button>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */

function validateOnEditBlur(input: string | undefined, key: string | undefined) {
    if (!input || input.length === 0 || !key) return false;
    let keyUp = key.toUpperCase();
    if (keyUp === 'PRICE' || keyUp.includes('ROOMS')) {
        return /^\d+$/.test(input);
    }
    if (keyUp === 'START' || keyUp === 'END' || keyUp === 'DATE') {
        const dateRegEx = /^\d{2}-\d{2}-\d{4}$/
        return dateRegEx.test(input);
    }
    if (keyUp === "TIME") {
        const timeRegEx = /^(1[012]|[1-9]):[0-5][0-9][ap]m$/
        return timeRegEx.test(input);
    }
    return true;
}