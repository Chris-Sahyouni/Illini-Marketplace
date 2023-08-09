'use client'

import { useState, createContext } from "react";

interface lightBoxContextType {
    lightBoxId: string | undefined;
    boxState: (id: string | undefined) => void
  }
  
  export const LightBoxContext = createContext<lightBoxContextType>({lightBoxId: undefined, boxState: (id: string | undefined) => {}});
  
  export function LightBoxProvider({ children }: { children: React.ReactNode }) {
    const [lightBoxId, setLightBoxId] = useState<string | undefined>(undefined);
  
    const openBox = (id: string | undefined) => {
      setLightBoxId(id);
    }
  
    const contextValue: lightBoxContextType = {
      lightBoxId,
      boxState: openBox
    }
  
  
    return (
      <LightBoxContext.Provider value={contextValue} >{children}</LightBoxContext.Provider>
    );
  
  }