import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Inbox } from 'lucide-react';
import axios, { CancelTokenSource } from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

type UploadingFile = {
  file: File;
  size: number;
  progress: number;
  status: 'uploading' | 'completed' | 'failed';
};

const FileUpload: React.FC = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [successfulUploads, setSuccessfulUploads] = useState<number>(0);
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!isSignedIn) {
      navigate('/sign-in');
      return;
    }

    if (acceptedFiles.length === 0) return;

    setTotalFiles((prevTotal) => prevTotal + acceptedFiles.length);

    const newUploadingFiles: UploadingFile[] = acceptedFiles.map((file) => ({
      file,
      size: file.size,
      progress: 0,
      status: 'uploading',
    }));
    setUploadingFiles((prevUploadingFiles) => [...prevUploadingFiles, ...newUploadingFiles]);

    const uploadRequests: Promise<void>[] = [];
    const cancelTokens: CancelTokenSource[] = [];

    acceptedFiles.forEach((file, index) => {
      const formData = new FormData();
      formData.append('files', file);

      const cancelToken = axios.CancelToken.source();
      cancelTokens.push(cancelToken);

      const uploadRequest = axios.post<void>('http://localhost:5000/upload', formData, {
        cancelToken: cancelToken.token,
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / (progressEvent.total ?? 1)) * 100);
          setUploadingFiles((prevUploadingFiles) => {
            const updatedFiles = [...prevUploadingFiles];
            updatedFiles[prevUploadingFiles.length - acceptedFiles.length + index].progress = progress;
            return updatedFiles;
          });
        }
      }).then(() => {
        setSuccessfulUploads((prevSuccessfulUploads) => prevSuccessfulUploads + 1);
        setUploadingFiles((prevUploadingFiles) => {
          const updatedFiles = [...prevUploadingFiles];
          updatedFiles[prevUploadingFiles.length - acceptedFiles.length + index].status = 'completed';
          return updatedFiles;
        });
      }).catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Upload cancelled:', error.message);
        } else {
          console.error('Error uploading file:', error);
          setUploadingFiles((prevUploadingFiles) => {
            const updatedFiles = [...prevUploadingFiles];
            updatedFiles[prevUploadingFiles.length - acceptedFiles.length + index].status = 'failed';
            return updatedFiles;
          });
        }
      });

      uploadRequests.push(uploadRequest);
    });

    try {
      await Promise.all(uploadRequests);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }, [isSignedIn, navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: !isSignedIn,
  });

  return (
    <div className='p-4 bg-white dark:bg-gray-900 rounded-xl'>
      <div {...getRootProps({
        className: `border-dashed border-2 hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-400 cursor-pointer rounded-xl bg-gray-50 dark:bg-gray-800 py-10 flex justify-center items-center flex-col ${!isSignedIn && 'opacity-50 cursor-not-allowed cursor-mouse hover:border-gray-200 dark:hover:border-gray-600'}`,
        onClick: !isSignedIn ? (e) => { e.preventDefault(); navigate('/sign-in'); } : undefined,
      })}>
        <input {...getInputProps()} />
        <Inbox className='w-10 h-10 text-blue-500' />
        {
          isDragActive ?
            <p className='mt-2 text-sm text-gray-600'>Drop Files Here</p> :
            <p className='mt-2 text-sm text-gray-600'>Drag 'n' drop files here, or click to select files</p>
        }
      </div>

      {isSignedIn && (
        <>
          <div className="flex flex-col items-center justify-center h-full mt-4">
            <p className='text-sm text-gray-600'>{successfulUploads} file(s) uploaded successfully out of {totalFiles} file(s)</p>
          </div>
          <div className="mt-4">
            {uploadingFiles.map((uploadingFile, index) => (
              <div key={index} className="mt-2 p-2 border rounded dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-white">{uploadingFile.file.name}</p>
                <p className="text-sm text-gray-600">Progress: {uploadingFile.progress}%</p>
                <p className="text-sm text-gray-600">
                  {uploadingFile.status === 'uploading' ? 'Uploading...' : `${formatBytes(uploadingFile.size)} • `}
                  <span className={`text-green-500 ${uploadingFile.status === 'completed' ? '' : 'hidden'}`}>
                    Completed
                  </span>
                  <span className={`text-red-500 ${uploadingFile.status === 'failed' ? '' : 'hidden'}`}>
                    Failed
                  </span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
