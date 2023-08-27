"use client"

import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function Page() {

    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!validateFormat(email)) {
        setError('outline-red-500');
        return;
      } else {
        setLoading(true);
        // do email stuff here AND SET THE USER PASSWORD TO THE TEMPORARY PASS
        const tmpPass = nanoid();
        const res = await fetch('http://localhost:3000/api/update-pass', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                newpass: tmpPass
            })
        });
        if (res.status === 500) {
            setError('outline-red-500');
            setLoading(false);
        } else {
            setSubmitted(true);
            setLoading(false);
        }
      }
    }

    if (submitted) {
        return (
            <div className="w-1/3 bg-white rounded mx-auto mt-8 p-6 flex flex-col text-center">
                <h1 className="font-bold mb-2">A temporary password has been sent to your email</h1>
                <p className="text-sm">You can then change it from the my account page under your netId in the top right</p>
            </div>
        );
    }

    return (
        <div className="w-1/4 bg-white rounded mx-auto mt-8 p-6 flex flex-col">
            <h1 className="font-bold mx-auto pb-4">Forgot password?</h1>
            Please enter your email
            <input type="text" onChange={(e) => { setEmail(e.target.value); setError('') }} value={email} maxLength={40} className={` ${error} outline rounded p-1`} placeholder="email" />
            <div className="p-2 justify-center flex">
                {
                    loading ? <CircularProgress size={50} />
                    : <button type="button" className="p-2 rounded text-white bg-gradient-radial from-sky-900 to-sky-950 hover:from-sky-700 hover:to-sky-900" disabled={email === ""} onClick={handleSubmit} >Submit</button>
                }
            </div>
        </div>
    );
}

function validateFormat(email: string) {
    try {
        const parts = email.split('@');
        return parts.length === 2 && parts[1] === 'illinois.edu';
    } catch (err) {
        return false;
    }
}