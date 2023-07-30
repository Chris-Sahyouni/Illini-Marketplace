'use client'

import { CldUploadWidget } from 'next-cloudinary';
 
export default function ImageUpload() {

    return (
        <CldUploadWidget uploadPreset="i41pivl8">
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