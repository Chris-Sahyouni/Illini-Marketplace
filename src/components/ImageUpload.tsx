'use client'
import { CldUploadWidget, CldUploadWidgetPropsOptions } from 'next-cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Dispatch, SetStateAction } from 'react';


interface ImageUploadProps {
    imageId: string;
    index: number;
    max: number;
    setImgIndex: Dispatch<SetStateAction<number>>;
    // setIsUploaded: Dispatch<SetStateAction<boolean>>
}

export default function ImageUpload({imageId, index, max, setImgIndex}: ImageUploadProps) {

    // useEffect(() => {}, [idx])

    const handleUpload = (error: UploadApiErrorResponse | null, result: UploadApiResponse, widget: any) => {
        setImgIndex((prev) => prev + 1)
    }

    let uploadOptions: CldUploadWidgetPropsOptions = {
        maxFiles: max,
        cropping: true,
        croppingValidateDimensions: true,
        croppingAspectRatio: 1.25,
        showSkipCropButton: false,
        resourceType: "image",
        folder: imageId,
    }

    return (
        <CldUploadWidget uploadPreset="testing" onUpload={handleUpload} options={uploadOptions} >
        {({ open }) => {
            function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            open();
            }
            return (
            <button className="button bg-gradient-radial from-blue-400 to-blue-600 hover:from-blue-200 hover:to-blue-400 text-white rounded h-1/4 my-auto p-3" onClick={handleOnClick} disabled={index > max}>
                Upload an Image (opt)
            </button>
            );
        }}
        </CldUploadWidget>
    )
}