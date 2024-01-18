import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Inbox } from 'lucide-react';

const FileUpload = () => {
    const onDrop = useCallback((acceptedFiles) => {
      // Do something with the accepted files
      console.log(acceptedFiles);
    }, []);
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 5, // Accept a minimum of 5 files
        accept: ['.txt', '.pdf', 'jpg'], // Accept only txt, pdf and jpg files
    });
    
      return (
        <div className='p-2 bg-white rounded-xl'>
            <div {...getRootProps({
                className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-10 flex justify-center items-center flex-col'
            })}>
            <input {...getInputProps()} />
            <Inbox className='w-10 h-10 text-blue-500' />
            {
                isDragActive ?
                <p className='mt-2 text-sm text-slate-400'>Drop Files Here</p> :
                <p className='mt-2 text-sm text-slate-400'>Drag 'n' drop files here, or click to select files</p>
            }
            </div>
        </div>
      );
    };

export default FileUpload;