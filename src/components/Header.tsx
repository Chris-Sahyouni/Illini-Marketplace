
import { useState } from "react"

export default function Header() {
    return (
        <div className="flex bg-orange-600 p-4 font-bold justify-end">
            <button className="p-2 hover:bg-orange-400">Home</button>
            <button className="p-2 hover:bg-orange-400">About</button>
            <button className="p-2 hover:bg-orange-400">Log in/Create an account</button>
        </div>
    )
}
