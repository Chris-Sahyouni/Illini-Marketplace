'use client'

import { useState, createContext } from "react";
import { CardData } from "../../lib/types/interfaces";

interface EditorContextType {
    toEdit: CardData | undefined;
    openEditor: (item: CardData | undefined) => void
}

  export const EditorContext = createContext<EditorContextType>({toEdit: undefined, openEditor: (item: CardData | undefined) => {}});

  export function EditorProvider({ children }: { children: React.ReactNode }) {
    const [toEdit, setToEdit] = useState<CardData | undefined>(undefined);

    const openEditor = (item: CardData | undefined) => {
      setToEdit(item);
    }

    const contextValue: EditorContextType = {
        toEdit,
        openEditor,
    }


    return (
      <EditorContext.Provider value={contextValue} >{children}</EditorContext.Provider>
    );

  }