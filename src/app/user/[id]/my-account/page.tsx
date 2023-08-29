"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

export default function Page() {

    const { data:session } = useSession();

    const [defaultContact, setDefaultContact] = useState<string | undefined>(session?.user.contact);
    const [contactInputBox, setContactInputBox] = useState(false);
    const [passwordInputBox, setPasswordInputBox] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConf, setNewPasswordConf] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successfulPassChange, setSuccessfulPassChange] = useState(false);

    const submitPasswordChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newPassword != newPasswordConf) {
            setError("passwords do not match");
            return;
        }
        if (newPassword.length < 8) {
            setError('password must be at least 8 characters');
            return;
        }
        setLoading(true);
        const res = await fetch("http://localhost:3000/api/update-pass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                newpass: newPassword,
                id: session?.user.id,
            })
        });
        setPasswordInputBox(false);
        setSuccessfulPassChange(true);
        setLoading(false);
    }

    useEffect(() => {
        setDefaultContact(session?.user.contact)
    }, [session])

    useEffect(() => {
        const handleEnter = async (e: KeyboardEvent) => {
            if (contactInputBox && e.key === 'Enter') {
                setContactInputBox(false);
                await fetch('http://localhost:3000/api/update-user', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        id: session?.user.id,
                        newContact: defaultContact
                    })
                });
                if (session) session.user.contact = defaultContact;
            }
        }

        if (contactInputBox) window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener("keydown", handleEnter);
        }
    }, [contactInputBox, defaultContact])

    if (successfulPassChange) {
        return (
            <div className="bg-white rounded flex w-1/3 flex-col p-6 text-center mx-60 my-8">
                <h1 className="font-bold mb-2">Success</h1>
                <p>Please sign out and in again to complete this change</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded mx-3 my-6 px-7 py-3 w-4/5">

            <div className="my-2">
                <h1 className="font-bold text-3xl mb-8">{session?.user.email?.split('@')[0]}</h1>
            </div>

            <div className="flex col-3">
                <h1 className="font-bold p-1 text-lg">default contact: </h1>
                {
                    contactInputBox ?
                    <div className="flex-col w-1/3">
                        <input type="text" value={defaultContact} onChange={(e) => {setDefaultContact(e.target.value)}} className="outline rounded p-1" maxLength={20} />
                        <p className=" text-xs text-gray-500">Note: changes to this may not appear until you sign out and back in</p>
                    </div>
                    : <p className="p-1 text-lg mr-3">{defaultContact}</p>
                }

                <button className="p-1 hover:opacity-60" type="button" onClick={() => setContactInputBox(true)}>
                    <Image src='/edit_icon.png' alt="" height={15} width={15} />
                </button>
            </div>

            <div>
                { !loading ?
                    <>
                        <button className="text-blue-600 hover:text-blue-400 p-1 mt-4" onClick={() => setPasswordInputBox(!passwordInputBox)}>change my password</button>
                        {
                            passwordInputBox ?
                            <div className='p-1 mt-2'>
                                <input type='password' placeholder="new password" className="p-1 m-1 outline rounded" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                <input type="password" placeholder="confirm new password" className="p-1 m-1 outline rounded" value={newPasswordConf} onChange={(e) => setNewPasswordConf(e.target.value)}/>
                                <button className="py-2 px-5 m-1 bg-gradient-radial from-blue-400 to-blue-600 hover:bg-gradient-radial hover:from-blue-300 hover:to-blue-600 text-white rounded" onClick={submitPasswordChange} disabled={newPassword === '' || newPasswordConf === ''}>Submit</button>
                            </div>
                            : null
                        }
                    </>
                    : <CircularProgress size={50} />
                }
            </div>

        </div>
    );
}