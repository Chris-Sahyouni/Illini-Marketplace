import { CardData } from "@/src/lib/types/interfaces";
import { useContext, useState, Dispatch, SetStateAction } from "react";
import { EditorContext } from "../EditorProvider";


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
        hasImage: toEdit.hasImage,
      }
      return build;
    });

    const keys = toEdit.keys || [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = Number(e.target.getAttribute('id'));
        if (editable.values) {
            setEditable((prev) => {
                let updated = {...prev};
                if (updated.values) updated.values[index] = e.target.value;
                return updated;
            })
        }
    }

    const handleSave = async () => {
        const res = await fetch('http://localhost:3000/api/update', {
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
                  return (
                    <div key={`div-${key}`} className="p-1 m-1 my-2 col-2 flex">
                        <h1 key={`label-${key}`} className="font-bold text-lg p-1 ">{key}:</h1>
                        <input type="text" key={key} id={index.toString()} value={editable.values ? editable.values[index] : ''} className="p-1 ml-1 outline relative m-0 block w-1/3 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(10,113,202)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary" onChange={handleChange} />
                    </div>
                  );
                })
            }
            <div className="justify-end mt-5 p-2 flex">
                <button className="py-2 px-2 bg-gradient-radial from-red-400 to-red-600 hover:bg-gradient-radial hover:from-red-300 hover:to-red-600 text-white rounded" onClick={() => openEditor(undefined)}>Discard</button>
                <button className="ml-2 py-2 px-2 bg-gradient-radial from-blue-400 to-blue-600 hover:bg-gradient-radial hover:from-blue-300 hover:to-blue-600 text-white rounded" onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
}