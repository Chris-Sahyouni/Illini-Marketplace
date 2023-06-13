"use client"

import { useState } from "react"
import { useSession, signIn, signOut} from 'next-auth/react'
import  Link  from 'next/link';
import React from "react";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";


export default function Header() {

   const  { data:session } = useSession();

   const dropdownOptions = ['My Account', 'Favorites', 'Sign Out'];

   const [toggleDropdown, setToggleDropdown] = useState(false);

    if (session && session.user) {

        // if user is admin
        if (session.user.isAdmin) {
            return (
                <div className="flex bg-orange-600 p-4 font-bold justify-end">
                    <Link className="p-2 hover:bg-orange-500 hover:outline" href={'/admin'} >Admin</Link>
                    <Link className="p-2 hover:bg-orange-500 hover:outline" href={'/'}>Home</Link>                    <button className="p-2 hover:bg-orange-500 hover:outline">About</button>
                    <button className="p-2 hover:bg-orange-500 hover:outline" onClick={() => signOut()}>{session.user?.username}</button>
                    <>
                        {toggleDropdown ? <Dropdown options={dropdownOptions} isOpen={toggleDropdown}/> : null}
                    </>
                </div>
            );
        }
        //

        // try and get a little arrow next to the username for the dropdown menu
        return (
            <div className="flex bg-orange-600 p-3 font-bold text-lg justify-between">
                <div className="w-1/3">
                    Logo here
                </div>
                <input type="text" placeholder="Search" className="w-1/3 font-light italic" />
                <div className="w-1/3 flex justify-end">
                    <Link className="p-2 hover:bg-orange-500 hover:outline" href={'/'}>Home</Link>
                    <Link className="p-2 hover:bg-orange-500 hover:outline" href={'/'}>About</Link>
                    <button className="p-2 hover:bg-orange-500 hover:outline relative" onClick={() => setToggleDropdown(!toggleDropdown)}>{session.user?.username}</button>
                    <>
                        {toggleDropdown ? <Dropdown options={dropdownOptions} isOpen={toggleDropdown}/> : null}
                        
                    </>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-orange-600 p-3 font-bold justify-end text-lg">
            <Link className="p-2 hover:bg-orange-500 hover:outline" href={'/'}>Home</Link>
            <button className="p-2 hover:bg-orange-500 hover:outline">About</button>
            <button className="p-2 hover:bg-orange-500 hover:outline" onClick={() => signIn()}>Log in</button>
        </div>
    );
}

