import Image from "next/image";
import { CardData } from "../lib/types/interfaces";

interface ItemProps {
    data: CardData
}

export default function Card({data}: ItemProps) {

if (data === undefined) return (<></>);

    return (
        <div className=" w-full h-36 rounded-xl flex-row bg-white p-2 flex">
            <div className="w-1/4 h-full relative my-auto outline outline-slate-700 rounded hover:opacity-80">
            <Image
                src={'/puppy.png'}
                fill={true}
                alt='Image of Puppy'
            />
            </div>
            <div className="columns-2 px-2 w-3/4 pl-4">
                    {
                        data.keys?.map((field, index) => {
                            return (
                                <div className="flex flex-row py-2" key={field}> 
                                    <p className="font-bold pr-1">{field}:</p>
                                    <p>{data.values?.at(index)}</p>
                                </div>
                            );
                        })
                    }
            </div>
        </div>
    );
}

// function renderFields(item: Item) {
//     const fields = Object.keys(item);
//     const values = Object.values(item);
//     fields.map((field, index) => {
//         return (
//             <>
//                 <p className="bold">field:</p>
//                 <p>{values[index]}</p>
//             </>
//         );
//     })
    
// }

// function imageGen(src: string) {
//     return (
//         <Image
//             src={src}
//             width={80}
//             height={80}
//             alt='Image of Puppy'
//         />
//     )
// }