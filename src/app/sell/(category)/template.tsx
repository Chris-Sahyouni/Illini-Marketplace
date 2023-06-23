"use client"

import Card from "@/src/components/Card";
import { useState } from "react";
import { CardData } from "@/src/lib/types/interfaces";
import { ItemData } from "@/src/lib/types/models";


    export default function Template({ children }: { children: React.ReactNode }) {

        const [data, setData] = useState<CardData>();

        return (
            <div className="h-screen items-center">

                <div className="h-1/2 outline">
                    {children}
                </div>
            
                <div className="outline h-1/2 overflow-clip w-1/2 mx-auto">
                    <div className="mx-auto p-2">
                        {
                            data ? <Card data={data}/> : <Card data={{}} />
                        }
                        
                    </div>
                </div>
                
            </div>
        )
    }
