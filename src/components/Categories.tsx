"use client"

import Link from 'next/link'

export default function Categories() {

    const linkStyles: string = 'text-white font-semibold hover:underline center py-2 px-6';

    return (
        <div className="h-10 bg-sky-950 flex justify-center">
            <Link href={'/'} className={linkStyles}>Tickets</Link>
            <Link href={'/'} className={linkStyles}>Textbooks</Link>
            <Link href={'/'} className={linkStyles}>Subleases</Link>
            <Link href={'/'} className={linkStyles}>Transit</Link>
            <Link href={'/'} className={linkStyles}>Parking</Link>
            <Link href={'/'} className={linkStyles}>Misc</Link>
        </div>
    );

}