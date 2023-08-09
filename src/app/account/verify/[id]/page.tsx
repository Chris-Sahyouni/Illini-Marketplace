"use client"

import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string}}) {

    enum status {
        Incomplete,
        Success,
        Fail
    }

    const [success, setSuccess] = useState(status.Incomplete);

    useEffect(() => {
        try {
            const { id } = params;
            const verify = async () => {
                let res = await fetch('/api/verify', {
                    method: "POST",
                    body: JSON.stringify({ id }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (res.status === 200) setSuccess(status.Success);
                else setSuccess(status.Fail);
            }
            verify();
        } catch (error) {
            setSuccess(status.Fail);
        }
    }, [params]);


    if (success === status.Incomplete) {
        return (
            <h1>loading</h1>
        );
    }

    if (success) {
        return (
        <div className="flex my-10 justify-center">
            <div className="bg-white w-1/3 justify-center flex-col rounded">
                <div className="flex justify-center p-5">
                    <h1>Your email has been verified</h1>
                </div>
                <div className="flex text-center justify-center p-2 pb-4">
                    <p>Log in to continue</p>
                </div>
            </div>
        </div>
        );
    } else {
        return (
            <div className="flex my-10 justify-center">
                <div className="bg-white w-1/3 justify-center flex-col">
                    <div className="flex justify-center p-5">
                        <h1>Something went wrong</h1>
                    </div>
                </div>
            </div>
        );
    }

}

