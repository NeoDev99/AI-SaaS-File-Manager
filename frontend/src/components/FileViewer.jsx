import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { File } from 'lucide-react';

const FileViewer = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Retrieve list of files from Flask backend
        const response = await axios.get('http://localhost:5000/list_files');
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="flex justify-center">
      {files.map((file, index) => (
        <div key={index} className="flex flex-col items-center mx-4">
          <File size={24} className="file-icon" />
          <span className="file-name">{file}</span>
        </div>
      ))}
    </div>
  );
};

export default FileViewer;
