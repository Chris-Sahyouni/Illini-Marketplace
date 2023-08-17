"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {

    const { data:session } = useSession();
    const [defaultContact, setDefaultContact] = useState<string>(session?.user.contact || '');

    console.log(session);
    return (
        <div className="bg-white rounded mx-3 my-6 px-5 py-3 w-4/5">
            <div className="my-2">
                <h1 className="font-bold text-xl mb-6">{session?.user.email?.split('@')[0]}</h1>
            </div>
            <div className="flex col-2">
                <h1 className="font-bold p-1">default contact: </h1>
                <p className="p-1">{defaultContact}</p>
            </div>
            <button className="text-blue-600 hover:text-blue-400 p-1 p-3">change</button>
            <div>
                <button className="text-blue-600 hover:text-blue-400 p-1 p-3">change my password</button>
            </div>
        </div>
    );
}