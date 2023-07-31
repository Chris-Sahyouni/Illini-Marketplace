'use client'
import { CldUploadWidget, CldUploadWidgetPropsOptions } from 'next-cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { useState, Dispatch, SetStateAction } from 'react';


interface ImageUploadProps {
    imageId: string;
    setIsUploaded: Dispatch<SetStateAction<boolean>>;
}

export default function ImageUpload({imageId, setIsUploaded}: ImageUploadProps) {

    const [isDisabled, setIsDisabled] = useState(false)

    const handleUpload = (error: UploadApiErrorResponse | null, result: UploadApiResponse, widget: any) => {
        setIsUploaded(true);
        setIsDisabled(true)
        console.log("uploaded " + result.info)
    }

    let uploadOptions: CldUploadWidgetPropsOptions = {
        maxFiles: 1,
        cropping: true,
        croppingValidateDimensions: true,
        croppingAspectRatio: 1.25,
        showSkipCropButton: false,
        resourceType: "image",
        publicId: imageId,
        
    }

    return (
        <CldUploadWidget uploadPreset="default_preset" onUpload={handleUpload} options={uploadOptions} >
        {({ open }) => {
            function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            open();
            }
            return (
            <button className="button bg-blue-600 text-white rounded h-1/4 my-auto p-3 hover:bg-blue-400" onClick={handleOnClick} disabled={isDisabled}>
                Upload an Image (opt)
            </button>
            );
        }}
        </CldUploadWidget>
    )
}