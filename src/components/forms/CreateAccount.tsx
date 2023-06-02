"use client"

import { test } from "node:test";
import { useState, useEffect } from "react";

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


    return (
    <div className="h-screen">
        <div className="bg-gray outline mx-20 my-20 h-1/2">
            <form onSubmit={handleSubmit}>
                    <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
                    <input type="text" value={email} onChange={handleEmailChange} placeholder="email" />
                    <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm your password" />
                    <button type="submit" >Create Account</button>
            </form>
        </div>
    </div>    
    );
}