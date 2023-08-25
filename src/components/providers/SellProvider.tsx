'use client'

import { useState, createContext } from "react";

interface SellContextType {
    numImages: number
    setNumImages: (n: number) => void
}

  export const SellContext = createContext<SellContextType>({numImages: 0, setNumImages: (n: number) => {}});

  export function SellProvider({ children }: { children: React.ReactNode }) {
    const [numImages, setNum] = useState<number>(0);

    const setNumImages = (n: number) => {
      setNum(n)
    }

    const contextValue: SellContextType = {
        numImages,
        setNumImages,
    }


    return (
      <SellContext.Provider value={contextValue} >{children} </SellContext.Provider>
    );

  }