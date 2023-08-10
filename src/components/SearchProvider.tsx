'use client'

import { useState, createContext } from "react";

interface SearchContextType {
    content: string;
    setContent: (content: string) => void;
    trigger: boolean;
    setTrigger: (trigger: boolean) => void;
}

export const SearchContext = createContext<SearchContextType>({
    content: "",
    setContent: (content: string) => {},
    trigger: false,
    setTrigger: (trigger: boolean) => {}
});

export function SearchProvider({children}: {children: React.ReactNode}) {
    const [content, setContent] = useState<string>('');
    const [trigger, setTrigger] = useState(false);

    const setSearch = (content: string) => {
        setContent(() => content);
    }

    const setTriggerWrapper = (trigger: boolean) => {
        setTrigger(trigger);
    }

    const contextValue: SearchContextType = {
        content,
        setContent: setSearch,
        trigger,
        setTrigger: setTriggerWrapper
    }

    return (
        <SearchContext.Provider value={contextValue} >{children}</SearchContext.Provider>
    );

}

