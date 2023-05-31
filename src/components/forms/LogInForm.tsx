"use client"

import { test } from "node:test";
import { useState, useEffect } from "react";

export default function LogInForm() {

    const [username, setUsername] = useState("");
    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
      }

    const [password, setPassword] = useState("");
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const [testLogIn, setTestLogIn] = useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTestLogIn(true);
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

        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" />
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
                <button type="submit" >Log in</button>
                <div>
                    {testLogIn ? <h1>success</h1> : <h1>not yet logged in</h1>}
                </div>
            </form>
        </div>
    );
}