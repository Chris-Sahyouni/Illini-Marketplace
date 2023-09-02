'use client'

import { CldUploadWidget, CldUploadWidgetPropsOptions } from 'next-cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { useContext } from 'react';
import { SellContext } from './providers/SellProvider';


interface ImageUploadProps {
    imageId: string;
    max: number;
}

export default function ImageUpload({imageId, max}: ImageUploadProps) {

    const context = useContext(SellContext);

    const handleUpload = (error: UploadApiErrorResponse | null, result: UploadApiResponse, widget: any) => {
        context.setNumImages(context.numImages + 1);
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
        <CldUploadWidget uploadPreset="default" onUpload={handleUpload} options={uploadOptions} >
        {({ open }) => {
            function handleOnClick(e: React.MouseEvent<HTMLButtonElement>) {
            e.preventDefault();
            open();
            }
            return (
            <button className="button bg-gradient-radial from-blue-400 to-blue-600 hover:from-blue-200 hover:to-blue-400 disabled:from-gray-400 disabled:to-gray-600 text-white rounded h-1/4 my-auto p-3" onClick={handleOnClick} disabled={context.numImages >= max}>
                {
                    max === 4 ? `Upload up to ${max - context.numImages} images (opt)` : 'Upload an Image (opt)'
                }
            </button>
            );
        }}
        </CldUploadWidget>
    )
}