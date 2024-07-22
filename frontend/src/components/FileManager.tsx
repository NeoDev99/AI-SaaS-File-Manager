import React, { useEffect, useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import FileViewer from './FileViewer';
import axios from 'axios';

const FileManager: React.FC = () => {
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [totalSize, setTotalSize] = useState<number>(0);

  useEffect(() => {
    refreshStats();
  }, []);

  const refreshStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/file_stats');
      const { totalFiles, totalSize } = response.data;
      setTotalFiles(totalFiles);
      setTotalSize(totalSize);
    } catch (error) {
      console.error('Error fetching file stats:', error);
    }
  };

  const handleFileChange = () => {
    // Update total files and total size after file operation
    refreshStats();
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 min-h-screen flex items-center justify-center pt-24 pb-12">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl min-w-[70vw] relative">
        <h1 className="text-2xl pb-2 mb-4">SaaS AI-based File Manager</h1>

        <div className="flex items-center mb-4">
          <span className="mr-2">Sort</span>
          <ArrowDownUp className="mr-2" />
          <div className="ml-auto flex flex-col text-right">
            <span>Total Files: {totalFiles}</span>
            <span>Total Size: {isNaN(totalSize) ? 'Calculating...' : formatBytes(totalSize)}</span>
          </div>
        </div>

        <div className='border-dashed border-2 mt-4 p-4'>
          <FileViewer onFileChange={handleFileChange} />
        </div>
      </div>
    </div>
  );
};

export default FileManager;
