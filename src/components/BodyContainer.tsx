"use client"

import LogInForm from "./forms/LogInForm";
import CreateAccount from "./forms/CreateAccount";
import { useState, useEffect } from "react";

interface Props {
    currentState: string
}

function getContent(state: string): JSX.Element {
    switch (state) {
        case "login": return <LogInForm />
        case "createAccount": return <CreateAccount />
    }
    return <></>
}

export default function BodyContainer(props: Props) {

    const [state, setState] = useState("");

    let currState: JSX.Element | null = getContent(props.currentState);

    return (
        <div className=" my-10 mx-10 outline h-fit">
            {currState}
        </div>
    );

}