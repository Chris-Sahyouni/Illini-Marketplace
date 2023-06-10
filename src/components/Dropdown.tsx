import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Props {
    options: string[];
    isOpen: boolean
}

export default function Dropdown({options, isOpen}: Props) {

    const ref = useRef<HTMLDivElement>(null);
    const [openState, setOpenState] = useState(isOpen)

    useEffect(() => {

    const handleClickOut = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenState(false);
      }
    }

      document.addEventListener("click", handleClickOut)
    

      return () => {
        document.removeEventListener("click", (handleClickOut))
      };

    }, []);


    if (!openState) {
        return null;
    }

    return (
        <div className="flex flex-col bg-white absolute mt-10" ref={ref}> 
            <ul>
                {options.map((option, index) => {
                    return <li key={index}><Link href={'/'} className="p-3 hover:bg-slate-200 flex">{option}</Link></li>
                })}
            </ul>
        </div>
    );
}