import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

interface Props {
    options: string[];
    isOpen: boolean
}

export default function Dropdown({options, isOpen}: Props) {

    const ref = useRef<HTMLDivElement>(null);
    const [openState, setOpenState] = useState(isOpen)

    const {data:session, status}  = useSession();

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


    const routes = [`/user/${session?.user.id}/my-account`, `/user/${session?.user.id}/saved`, `/user/${session?.user.id}/selling`];

    return (
        <div className="flex flex-col bg-white absolute mt-10 rounded-lg" ref={ref}> 
            <ul>
                {options.map((option, index) => {
                    if (index === options.length - 1) {
                        return <li key={index}><button onClick={() => signOut()} className="p-3 hover:bg-slate-200 flex w-full rounded-lg">{option}</button></li>
                    }
                    return <li key={index}><Link href={routes[index]} className="p-3 hover:bg-slate-200 flex rounded-lg">{option}</Link></li>
                })}
            </ul>
        </div>
    );
}