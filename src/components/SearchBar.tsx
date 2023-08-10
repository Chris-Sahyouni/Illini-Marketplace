import Image from "next/image";
import { useContext, useState } from "react";
import { SearchContext } from "./SearchProvider";

interface SearchBarProps {
    handleSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SearchBar({handleSearch}: SearchBarProps) {

    const [searchContent, setSearchContent] = useState("");
    const context = useContext(SearchContext);

     const handleSearchContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setSearchContent(val);
        context.setContent(val);
     }

    return (
        <div className='relative flex flex-wrap items-stretch w-1/2'>
            {/* <input type="search" placeholder="Search" className="w-1/3 placeholder:font-light placeholder:italic font-normal p-2 rounded relative" onChange={handleChange}/> */}
            {/* <button type="button" className="relative ml-1 bg-black z-[2] px-6 py-2">test</button> */}
            <input
                type="search"
                className="relative m-0 -mr-0.5 block w-1/3 min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(10,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:focus:border-primary"
                placeholder="Search"
                onChange={handleSearchContentChange} />

            <button
                className="relative z-[2] rounded-r px-4 py-2 focus:outline-none focus:ring-0 transition duration-150 ease-in-out  bg-gradient-radial from-white to-gray-300 hover:to-gray-100"
                type="button"
                id="button-addon3" 
                onClick={handleSearch} >

                <Image
                    src='/search_icon.png'
                    height={20}
                    width={20}
                    alt="search"
                />
            </button>
        </div>
    );
}