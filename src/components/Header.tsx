"use client"

import { useState } from "react"
import { useSession } from 'next-auth/react'
import  Link  from 'next/link';

export default function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const  { data:session } = useSession();

    if (session && session.user) {
        return (
            <div className="flex bg-orange-600 p-4 font-bold justify-end">
                <button className="p-2 hover:bg-orange-500 hover:outline">Home</button>
                <button className="p-2 hover:bg-orange-500 hover:outline">About</button>
                <button className="p-2 hover:bg-orange-500 hover:outline">{session.user.name}</button>
            </div>
        )
    }
    return (
        <div className="flex bg-orange-600 p-4 font-bold justify-end">
            <button className="p-2 hover:bg-orange-500 hover:outline">Home</button>
            <button className="p-2 hover:bg-orange-500 hover:outline">About</button>
            <Link className="p-2 hover:bg-orange-500 hover:outline" href={'/account/login'}>Log in</Link>
        </div>
    )
}

// ALL BUTTONS SHOULD BE CHANGED TO LINK
