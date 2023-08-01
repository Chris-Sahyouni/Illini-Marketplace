"use client"

import { useState } from "react"
import { useSession, signIn } from 'next-auth/react'
import  Link  from 'next/link';
import React from "react";
import Dropdown from "./Dropdown";
import Image from "next/image";


export default function Header() {

   const  { data:session } = useSession();

   const dropdownOptions = ['My Account', 'Saved', 'Sign Out'];

   const [toggleDropdown, setToggleDropdown] = useState(false);

   const [searchContent, setSearchContent] = useState("");

   const handleSearchContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchContent(event.target.value);
   }

    if (session && session.user) {

        // if user is admin
        if (session.user.isAdmin) {
            return (
                    <div className="flex bg-orange-600 p-3 font-bold text-lg justify-between">
                        <div className="w-1/3">
                            <Image
                                src='/logo.png'
                                alt=''
                            />
                        </div>
                        <input type="text" placeholder='Search' className="w-1/3 placeholder:font-light placeholder:italic font-normal p-2 rounded" onChange={handleSearchContentChange}/>
                        <div className="w-1/3 flex justify-end">
                            <Link className="p-2 hover:bg-orange-500 hover:outline" href={'/admin'} >Admin</Link>
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
        //

        // try and get a little arrow next to the username for the dropdown menu
        return (
            <div className="flex bg-orange-600 p-3 font-bold text-lg justify-between">
                <div className="w-1/3 ">
                    <Link href={'/'}>
                        <Image
                            src='/logo.png'
                            alt=''
                            width={250}
                            height={200}
                        />
                    </Link>
                </div>
                <input type="text" placeholder="Search" className="w-1/3 placeholder:font-light placeholder:italic font-normal p-2 rounded" onChange={handleSearchContentChange}/>
                <div className="w-1/3 flex justify-end">
                    <Link className="p-2 pt-3 hover:bg-orange-500 hover:outline rounded-sm" href={'/sell'}>Sell</Link>
                    <Link className="p-2 pt-3 hover:bg-orange-500 hover:outline rounded-sm" href={'/'}>About</Link>
                    <button className="p-2 hover:bg-orange-500 hover:outline relative rounded-sm" onClick={() => setToggleDropdown(!toggleDropdown)}>{session.user?.username}</button>
                    <>
                        {toggleDropdown ? <Dropdown options={dropdownOptions} isOpen={toggleDropdown}/> : null}
                    </>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-orange-600 p-3 font-bold text-lg justify-between">
                <div className="w-1/3">
                <Image
                    src='/logo.png'
                    alt=''
                    width={100}
                    height={100}
                />
                </div>
                <input type="text" placeholder="Search" className="w-1/3 placeholder:font-light placeholder:italic font-normal p-2 rounded" onChange={handleSearchContentChange}/>
                <div className="w-1/3 flex justify-end">
                    <button className="p-2 hover:bg-orange-500 hover:outline rounded-sm" onClick={() => signIn()}>Sell</button>
                    <Link className="p-2 hover:bg-orange-500 hover:outline rounded-sm" href={'/'}>About</Link>
                    <button className="p-2 hover:bg-orange-500 hover:outline rounded-sm" onClick={() => signIn()}>Log in</button>
                </div>
            </div>

    );

}

