'use client'

import { SellProvider } from "@/src/components/providers/SellProvider";


export default function MyAccountLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <section>
            <SellProvider>
                {children}
            </SellProvider>
        </section>
    );
  }