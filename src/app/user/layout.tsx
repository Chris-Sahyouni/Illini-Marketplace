'use client'

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { EditorProvider } from "@/src/components/EditorProvider";
import Editor from "@/src/components/Editor";

export default function MyAccountLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const { data:session } = useSession();

    return (
        <section>
            <EditorProvider>
                <Editor />
                <div className="col-2 h-screen flex">
                    <div className="bg-white w-1/6 h-1/3 ml-6 my-6 rounded-lg text-center p-3 text-lg">
                        <div className="outline-slate-200 outline rounded text-center p-4 text-lg h-full w-full">
                            <div className="h-1/3 justify-center my-auto">
                                <Link href={`/user/${session?.user.id}/my-account`} className="opacity-50 hover:opacity-100 hover:font-bold">My Account</Link>
                            </div>
                            <div className="h-1/3 justify-center text-center my-auto">
                                <Link href={`/user/${session?.user.id}/selling`} className="opacity-50 hover:opacity-100 hover:font-bold ">Selling</Link>
                            </div>
                            <div className="h-1/3 text-center justify-center my-auto">
                                <Link href={`/user/${session?.user.id}/saved`} className="opacity-50 hover:opacity-100 hover:font-bold ">Saved</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-5/6 overflow-scroll">
                        {children}
                    </div>
                </div>
            </EditorProvider>
        </section>
    );
  }