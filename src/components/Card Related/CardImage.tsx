import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { useContext } from "react";
import { LightBoxContext } from "../providers/LightBoxProvider";

interface CardImageProps {
    id: string;
    isUploaded: boolean;
}

export default function CardImage({ id, isUploaded }: CardImageProps) {

    const context = useContext(LightBoxContext);

    if (isUploaded && id) {

        return (
            <>
                <button onClick={() => context.boxState(id)}>
                    <CldImage
                        src={id}
                        height={130}
                        width={152}
                        crop="crop"
                        gravity="custom"
                        alt='img'
                    />
                </button>
            </>
        );
    }

    return (
        <>
            <Image
                src={'/placeholder.png'}
                fill={true}
                alt='img'
            />
        </>
    )
}

