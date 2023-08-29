
import Link from "next/link";

export default function Page() {   

    return (
        <div className="bg-white w-fit h-contain mx-auto flex flex-col text-center my-6 rounded-lg">
            <h1 className="p-4 font-bold text-lg">Which category do you want to sell in?</h1>
            <div className="flex flex-col">
                <Link href={'/sell/form?t=sublease'} className="py-1 text-lg opacity-50 text-slate-800 hover:opacity-100 hover:font-semibold hover:text-xl hover:py-5">Subleases</Link>
                <Link href={'/sell/form?t=ticket'} className="py-1 text-lg opacity-50 text-slate-800 hover:opacity-100 hover:font-semibold hover:text-xl hover:py-5">Tickets</Link>
                <Link href={'/sell/form?t=transit'} className="py-1 text-lg opacity-50 text-slate-800 hover:opacity-100 hover:font-semibold hover:text-xl hover:py-5">Transit</Link>
                <Link href={'/sell/form?t=textbook'} className="py-1 text-lg opacity-50 text-slate-800 hover:opacity-100 hover:font-semibold hover:text-xl hover:py-5">Textbooks</Link>
                <Link href={'/sell/form?t=parking'} className="py-1 text-lg opacity-50 text-slate-800 hover:opacity-100 hover:font-semibold hover:text-xl hover:py-5">Parking</Link>
                <Link href={'/sell/form?t=misc'} className="py-1 text-lg opacity-50 text-slate-800 hover:opacity-100 hover:font-semibold hover:text-xl hover:py-5">Misc</Link>
            </div>
        </div>
    );
}
