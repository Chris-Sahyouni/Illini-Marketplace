"use client"

import Link from 'next/link'

export default function Categories() {

    const linkStyles: string = 'text-white font-semibold hover:underline center py-2 px-6';

    // tickets should open a dropdown
    return (
        <div className="h-10 bg-sky-950 flex justify-center">
            <Link href={'/ticket'} className={linkStyles}>Tickets</Link>
            <Link href={'/textbook'} className={linkStyles}>Textbooks</Link>
            <Link href={'/sublease'} className={linkStyles}>Subleases</Link>
            <Link href={'/transit'} className={linkStyles}>Transit</Link>
            <Link href={'/parking'} className={linkStyles}>Parking</Link>
            <Link href={'/misc'} className={linkStyles}>Misc</Link>
        </div>
    );

}