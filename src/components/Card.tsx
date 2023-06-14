import { JsxElement } from "typescript";
import { Item } from "../lib/types/models";
import Image from "next/image";

interface ItemProps {
    item: Item;
}

export default function Card({item}: ItemProps) {
    return (
        <div className=" w-full h-36 rounded-xl flex-row bg-white p-2">
            <div className="w-1/4 h-full relative outline-dashed my-auto">
            <Image
                src={'/puppy.png'}
                fill={true}
                alt='Image of Puppy'
            />
            </div>
        </div>
    );
}

function imageGen(src: string) {
    return (
        <Image
            src={src}
            width={80}
            height={80}
            alt='Image of Puppy'
        />
    )
}