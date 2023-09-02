"use client"

import { useState } from "react";
import { newUserRequest } from "@/src/lib/types/interfaces";
import VerifyRequest from "../VerifyRequest";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function CreateAccount() {

    const [password, setPassword] = useState("");
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const [confirmPassword, setConfirmPassword] = useState("");
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }

    const [email, setEmail] = useState("");
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const [submittedForm, setSubmittedForm] = useState(false);
    const [error, setError] = useState("");

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (!isValidEmail(email)) {
            setError("not a valid illinois email address");
            return;
        }
        if (password.length < 8) {
            setError("password must be 8 characters or more");
            return;
        }
        if (password != confirmPassword) {
            setError("passwords do not match");
            return;
        }
         const data: newUserRequest = {
            email: email,
            username: extractNetId(email),
            password: password
         };
        sendRegisterRequest(data);
        setSubmittedForm(true);
     };

    if (submittedForm) {
        return (
            <VerifyRequest />
        );
    }

    return (
        <div className="justify-center my-10 flex">
            <form onSubmit={handleSubmit} className="w-1/3 bg-white h-full rounded p-2">
                <div className="flex justify-center text-red-400">
                    {error}
                </div>
                <div className="p-2 flex justify-center mt-2">
                    <input type="text" value={email} onChange={handleEmailChange} placeholder="Illinois email" className={`p-1 outline  min-w-0 rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(10,113,202)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary`} maxLength={40} />
                </div>

                <div className="p-2 flex justify-center">
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" className={`p-1 outline  min-w-0 rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(10,113,202)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary`} maxLength={40}/>
                </div>

                <div className="p-2 flex justify-center">
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm your password" className={`p-1 outline  min-w-0 rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(10,113,202)] focus:outline-none dark:border-neutral-600 dark:placeholder:text-neutral-400 dark:focus:border-primary`} maxLength={40} />
                </div>

                <div className="p-2 flex justify-center">
                    <button type="submit" className="p-2 rounded text-white bg-gradient-radial from-sky-900 to-sky-950 hover:from-sky-700 hover:to-sky-900" >Create Account</button>
                </div>
                <div className='p-2 flex'>
                    <button onClick={() => signIn()} className="text-blue-400 mx-auto hover:text-blue-600">Log in</button>
                    <Link href={'/account/forgot-pass'} className="text-blue-400 mx-auto hover:text-blue-600">Forgot Password?</Link>
                </div>
            </form>
        </div> 
    );
}


/* -------------------------------------------------------------------------- */


export function extractNetId(email: string): string {
    return email.split('@')[0];
}

export function isValidEmail(email: string): boolean {
    return email.endsWith("@illinois.edu");
}

export async function sendRegisterRequest(data: newUserRequest) {

    const res = await fetch(`${process.env.BASE_URL}/api/new_user`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    const parse = await res.json();
    return parse;
}