"use client"

import { test } from "node:test";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';

export default function LogInForm() {

    const [email, setEmail] = useState("");
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
      }

    const [password, setPassword] = useState("");
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };  


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

    }, []);

    
    const inputParentDivStyles = "p-2 flex justify-center";    

    return (

        <div className="justify-center my-10 flex">
            <form onSubmit={handleSubmit} className="w-1/3 bg-white h-full">
                <div className={inputParentDivStyles}>
                    <input type="text" value={email} onChange={handleEmailChange} placeholder="Email" className="outline" />
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