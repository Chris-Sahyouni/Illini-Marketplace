import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { useContext } from "react";
import { LightBoxContext } from "../providers/LightBoxProvider";

interface CardImageProps {
    id: string;
    isUploaded: boolean;
    dimensions: {width: number, height: number};
}

export default function CardImage({ id, isUploaded, dimensions }: CardImageProps) {

    const context = useContext(LightBoxContext);

    if (isUploaded && id) {

        return (
            <>
                <button onClick={() => context.boxState(id)}>
                    <CldImage
                        src={id}
                        height={Math.round(dimensions.height)}
                        width={Math.round(dimensions.width)}
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

