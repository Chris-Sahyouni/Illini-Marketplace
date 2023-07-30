'use client'
import { CldUploadWidget, CldUploadWidgetPropsOptions } from 'next-cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { useState, Dispatch, SetStateAction } from 'react';


interface ImageUploadProps {
    imageId: string;
    setIsUploaded: Dispatch<SetStateAction<boolean>>;
}

export default function ImageUpload({imageId, setIsUploaded}: ImageUploadProps) {

    const handleUpload = (error: UploadApiErrorResponse | null, result: UploadApiResponse, widget: any) => {
        setIsUploaded(true);
        console.log("uploaded " + result.info)
    }

    let uploadOptions: CldUploadWidgetPropsOptions = {
        maxFiles: 1,
        cropping: true,
        croppingAspectRatio: 1,
        showSkipCropButton: false,
        publicId: imageId
    }

    return (
        <CldUploadWidget uploadPreset="default_preset" onUpload={handleUpload} options={uploadOptions} >
        {({ open }) => {
            function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            open();
            }
            return (
            <button className="button bg-blue-600 text-white rounded h-1/4 my-auto p-3 hover:bg-blue-400" onClick={handleOnClick}>
                Upload an Image
            </button>
            );
        }}
        </CldUploadWidget>
    )
}