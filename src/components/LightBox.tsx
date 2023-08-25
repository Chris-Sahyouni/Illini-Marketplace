'use client'

import { useContext, useEffect, useState } from "react";
import { LightBoxContext } from "./providers/LightBoxProvider";
import { CldImage } from "next-cloudinary";

export default function LightBox() {

    const context = useContext(LightBoxContext);
    const [isOpen, setIsOpen]   = useState(false);

    useEffect(() => {
        const handleClick = () => {
            if (isOpen) {
                context.boxState(undefined);
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        }

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        }
    }, [context, isOpen])



    if (context.lightBoxId === undefined) {
        return null;
    } else {
         return (
             <div className="w-screen h-screen absolute bg-black bg-opacity-70 z-10 flex items-center justify-center">
                <div className="z-40 flex justify-center"> 

                    <CldImage
                        src={context.lightBoxId}
                        alt=""
                        crop="fit"
                        height={300}
                        width={300}
                        className="bg-opacity-100"
                    />
                </div> 
             </div> 
        );
    }
}