"use client"

import React from "react";
import { useState, useEffect, useCallback } from "react";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

export default function LogInForm() {

    const router = useRouter()

    const [username, setUserName] = useState("");
    const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }

    const [password, setPassword] = useState("");
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const [attempts, setAttempts] = useState(0);
    const [lockout, setLockout] = useState(false);

    useEffect(() => {
        console.log('attempt: ', attempts);
        if (attempts % 8 === 0 && attempts !== 0) {
            setLockout(true);

            let countdown = 30;
            const countdownInterval = setInterval(() => {
                if (countdown > 0) {
                    setError(`Too many log in attempts: ${countdown} seconds remaining`);
                    countdown--;
                } else {
                    setError('');
                    clearInterval(countdownInterval);
                    setLockout(false);
                }
              }, 1000);

            setError('');
        }
    }, [attempts])


    const handleSubmit = useCallback( async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError("")
        const result = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        });
        if (result && result.error) {
            setAttempts((prev) => prev + 1);
            setError('username or password is incorrect');
        } else {
             router.push('/')
        }
        setLoading(false);
    }, [username, password] );


    useEffect(() => {
        const handleEnter = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleSubmit;
            }
        };

        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener("keydown", handleEnter);
        }

    }, [handleSubmit]);

    return (

        <div className="justify-center my-10 flex">
            <form onSubmit={handleSubmit} className="w-1/3 bg-white h-full rounded-lg p-2">
                <div className="justify-center flex text-red-400">
                    {error}
                </div>
                <div className="p-2 flex justify-center mt-2">
                    <input type="text" value={username} onChange={handleUserNameChange} placeholder="NetId" className="outline rounded p-1" maxLength={30} />
                </div>

                <div className="p-2 flex justify-center">
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" className="outline rounded p-1" maxLength={40} />
                </div>
                {
                    loading ?
                    <div className="flex justify-center">
                        <CircularProgress size={50}  />
                    </div>
                    :
                    <div className="p-2 flex justify-center">
                        <button type="submit" className="p-2 rounded text-white bg-gradient-radial from-sky-900 to-sky-950 hover:from-sky-700 hover:to-sky-900" disabled={username === "" || password === "" || lockout}>Log in</button>
                    </div>
                }
                <div className='p-2 flex'>
                    <Link href={'/account/register'} className="text-blue-400 mx-auto hover:text-blue-600">Create an account</Link>
                    <Link href={'/account/forgot-pass'} className="text-blue-400 mx-auto hover:text-blue-600">Forgot Password?</Link>
                </div>
            </form>
        </div>
    );
}