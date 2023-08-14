"use client"

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { signIn, useSession } from 'next-auth/react';
import Link from "next/link";

export default function LogInForm() {


    const [username, setUserName] = useState("");
    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
      }

    const [password, setPassword] = useState("");
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }


    const { data:session, status } = useSession();

    const handleSubmit = useCallback( async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await signIn("credentials", {
            username: username,
            password: password,
            redirect: true,
            callbackUrl: "/"
        });
    }, [username, password] );


    useEffect(() => {
        const handleEnter = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleSubmit;
            }
        };

        window.addEventListener('keydown', handleEnter);

        return  () => {
            window.removeEventListener("keydown", handleEnter);
        }

    }, [handleSubmit]);

    

    return (

        <div className="justify-center my-10 flex">
            <form onSubmit={handleSubmit} className="w-1/3 bg-white h-full rounded-lg p-2">
                <div className="p-2 flex justify-center mt-2">
                    <input type="text" value={username} onChange={handleUserNameChange} placeholder="NetId" className="outline rounded p-1" />
                </div>

                <div className="p-2 flex justify-center">
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" className="outline rounded p-1" />
                </div>

                <div className="p-2 flex justify-center">
                    <button type="submit" className="p-2 rounded text-white bg-gradient-radial from-sky-900 to-sky-950 hover:from-sky-700 hover:to-sky-900">Log in</button>
                </div>

                <div className='p-2 flex'>
                    <Link href={'/account/register'} className="text-blue-400 mx-auto hover:text-blue-600">Create an account</Link>
                    <Link href={'/'} className="text-blue-400 mx-auto hover:text-blue-600">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
}