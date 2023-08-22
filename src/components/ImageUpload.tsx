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
            <button className="button bg-blue-600 text-white rounded h-1/4 my-auto p-3 hover:bg-blue-400" onClick={handleOnClick} disabled={index > max}>
                Upload an Image (opt)
            </button>
            );
        }}
        </CldUploadWidget>
    )
}