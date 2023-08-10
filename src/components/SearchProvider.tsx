'use client'

import { useState, createContext } from "react";

interface SearchContextType {
    content: string;
    setContent: (content: string) => void;
}

export const SearchContext = createContext<SearchContextType>({content: "", setContent: (content: string) => {}});

export function SearchProvider({children}: {children: React.ReactNode}) {
    const [content, setContent] = useState<string>('');
    
    const setSearch = (content: string) => {
        setContent(() => content);
    }

    const contextValue: SearchContextType = {
        content,
        setContent: setSearch
    }

    return (
        <SearchContext.Provider value={contextValue} >{children}</SearchContext.Provider>
    );

}

