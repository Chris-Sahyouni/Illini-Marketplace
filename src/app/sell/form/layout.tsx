'use client'

import { SellProvider } from "@/src/components/providers/SellProvider";
import { useSession, signOut } from "next-auth/react";


export default function MyAccountLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const {data:session} = useSession();

    if (session && new Date() > new Date(session.expires)) {
      signOut({ callbackUrl: "/" });
    }


    return (
        <section>
            <SellProvider>
                {children}
            </SellProvider>
        </section>
    );
  }