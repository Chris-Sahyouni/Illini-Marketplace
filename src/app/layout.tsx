import Providers from '../components/Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import { Italianno } from 'next/font/google'
import Header from '../components/Header'
import Categories from '../components/Categories'

const cursiveFont = Italianno({
  weight: "400",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Illini Marketplace',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} background-image`}>
        <Providers>
          <Header />
          <Categories />
          {children}
          <div className=' flex justify-center text-center'>
            <p className={` text-white ${cursiveFont.className} font-normal text-xl absolute bottom-1`}>Created by Chris Sahyouni</p>
          </div>
        </Providers>
      </body>
    </html>
  )
}
