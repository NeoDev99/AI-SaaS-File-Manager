import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Inbox } from 'lucide-react';
import axios from 'axios';

const FileUpload = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 5) {
      console.error('You can upload a maximum of 5 files at a time.');
      return;
    }

    const file = acceptedFiles[0];

    // Specify accepted MIME types and file extensions
    const acceptedTypes = ['text/plain', 'application/pdf'];
    const acceptedExtensions = ['.txt', '.pdf'];

    if (!acceptedTypes.includes(file.type) || !acceptedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
      console.error('Invalid file type or extension.');
      return;
    }

    // Process and upload files if the limit is not exceeded
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      // Send files to Flask backend for upload
      await axios.post('http://localhost:5000/upload', formData);
      console.log('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }, []);

  // ... Your file upload UI using a library like react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: ['text/plain', 'application/pdf'], // Accept only txt, pdf and jpg files
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