"use client"

import { useState } from "react";
import { newUserRequest, extractNetId, sendRegisterRequest, isValidEmail } from "@/src/lib/utilities";

export default function CreateAccount() {


    const [username, setUsername] = useState("");
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      }

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


     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
         event.preventDefault();
        if (!isValidEmail(email)) {
            console.error("invalid email address");
            return;
        }
         const data: newUserRequest = {
            email: email,
            netId: extractNetId(email),
            password: password
         };
         sendRegisterRequest(data);
     };  

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
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm your password" className="outline" />
                </div>

                <div className={inputParentDivStyles}>
                    <button type="submit" className="hover:outline">Create Account</button>
                </div>

            </form>
        </div>  
    );
}