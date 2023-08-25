import { CardData } from "../lib/types/interfaces";
import { useContext, useEffect, useState } from "react";
import { EditorContext } from "./providers/EditorProvider";
import EditForm from "./forms/EditForm";

export default function Editor() {

    const {toEdit, openEditor} = useContext(EditorContext)

    if (toEdit === undefined) {
        return null;
    }

    return (
        <div className=" z-50 w-full h-full absolute bg-black bg-opacity-50">
            <div className=" mx-auto my-10 h-fit max-h-2/3 w-1/3 overflow-scroll">
                <EditForm toEdit={toEdit} />
            </div>
        </div>
    );
}