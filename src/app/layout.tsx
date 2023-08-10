
import Providers from '../components/Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import { Italianno } from 'next/font/google'
import Header from '../components/Header'
import Categories from '../components/Categories'
import LightBox from '../components/LightBox'
import {LightBoxProvider} from '../components/LightBoxProvider'
import { SearchProvider } from '../components/SearchProvider'


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
      <title>Illini Marketplace</title>
      <body className={`${inter.className} background-image ::-webkit-scrollbar`}>
        <Providers>
            <LightBoxProvider>
              <SearchProvider>
                <Header />
                <Categories />
                <LightBox />
                {children}
                <div className=' flex justify-center text-center'>
                  <p className={` text-white ${cursiveFont.className} font-normal text-xl absolute bottom-1`}>Created by Chris Sahyouni</p>
                </div>
              </SearchProvider>
          </LightBoxProvider>
        </Providers>
      </body>
    </html>
  )

}

/* -------------------------------------------------------------------------- */






