"use client"

import Card from "@/src/components/Card";
import { VisibleData } from "@/src/lib/utilities";
import { useState } from "react";


    export default function Template({ children }: { children: React.ReactNode }) {

        const [data, setData] = useState<VisibleData>();

        return (
            <div className="h-screen items-center">

                <div className="h-1/2 outline">
                    {children}
                </div>
            
                <div className="outline h-1/2 overflow-clip w-1/2 mx-auto">
                    <div className="mx-auto p-2">
                        {
                            data ? <Card keyVals={data}/> : <Card keyVals={[[], []]} />
                        }
                        
                    </div>
                </div>
                
            </div>
        )
    }
