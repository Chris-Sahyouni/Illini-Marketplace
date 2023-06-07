"use client"

import { useEffect, useState } from "react"
import { useSession, signIn, signOut} from 'next-auth/react'
import  Link  from 'next/link';
import React from "react";


export default function Header() {

   const  { data:session } = useSession();

    if (session && session.user) {
        return (
            <div className="flex bg-orange-600 p-4 font-bold justify-end">
                <h1>IT WORKED</h1>
                <button className="p-2 hover:bg-orange-500 hover:outline">Home</button>
                <button className="p-2 hover:bg-orange-500 hover:outline">About</button>
                <button className="p-2 hover:bg-orange-500 hover:outline">{session.user.name}</button>
            </div>
        );
    }

    return (
        <div className="flex bg-orange-600 p-4 font-bold justify-end">
            <Link className="p-2 hover:bg-orange-500 hover:outline" href={'/'}>Home</Link>
            <button className="p-2 hover:bg-orange-500 hover:outline">About</button>

            <button className="p-2 hover:bg-orange-500 hover:outline" onClick={() => signIn()}>Log in</button>
        </div>
    );
}

// ALL BUTTONS SHOULD BE CHANGED TO LINK
