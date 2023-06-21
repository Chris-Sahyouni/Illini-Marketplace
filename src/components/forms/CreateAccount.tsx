"use client"

import { useState } from "react";
import { newUserRequest } from "@/src/lib/types/interfaces";
import VerifyRequest from "../VerifyRequest";

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

     const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (!isValidEmail(email)) {
            console.error("invalid email address");
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


    const inputParentDivStyles = "p-2 flex justify-center";

    if (submittedForm) {
        return (
            <VerifyRequest />
        );
    }

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
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm your password" className="outline" />
                </div>

                <div className={inputParentDivStyles}>
                    <button type="submit" className="hover:outline" >Create Account</button>
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

export function sendRegisterRequest(data: newUserRequest) {

    fetch('/api/new_user', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then((res: Response) => {
        if (res.status === 200) {
            return res.json();
        }
    })
}