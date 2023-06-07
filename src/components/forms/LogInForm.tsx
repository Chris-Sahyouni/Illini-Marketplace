"use client"

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { signIn, useSession } from 'next-auth/react';

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
    console.log(status);
    console.log(session);

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

    
    const inputParentDivStyles = "p-2 flex justify-center";    

    if (status === 'authenticated') {
        return (
            <h1>Authenticated</h1>
        );
    }

    return (

        <div className="justify-center my-10 flex">
            <form onSubmit={handleSubmit} className="w-1/3 bg-white h-full">
                <div className={inputParentDivStyles}>
                    <input type="text" value={username} onChange={handleUserNameChange} placeholder="NetId" className="outline" />
                </div>

                <div className={inputParentDivStyles}>
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" className="outline" />
                </div>

                <div className={inputParentDivStyles}>
                    <button type="submit" className="hover:outline">Log in</button>
                </div>

            </form>
        </div>
    );
}