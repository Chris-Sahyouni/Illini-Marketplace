import Image from "next/image";

export default function Logo() {
    return (
    <Image
        src='/logo.png'
        alt=''
        width={250}
        height={200}
    />
    );
}