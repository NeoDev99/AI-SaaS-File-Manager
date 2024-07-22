import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { File, Trash2 } from 'lucide-react';

const FileViewer: React.FC<{ onFileChange: () => void }> = ({ onFileChange }) => {
  const [files, setFiles] = useState<{ name: string; size: string; }[]>([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/list_files');
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleDelete = async (fileName: string) => {
    if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
      try {
        await axios.post('http://localhost:5000/delete_file', { file: fileName });

        // Optimistically update UI
        const updatedFiles = files.filter(file => file.name !== fileName);
        setFiles(updatedFiles);

        // Notify parent component (Page) about file change
        onFileChange();

        // Alert after successful deletion
        window.alert(`File ${fileName} deleted successfully!`);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  };

  const handleDoubleClick = async (index: number) => {
    const currentFileName = files[index].name;
    const extension = currentFileName.split('.').pop(); // Get the file extension
    const newName = prompt(`Enter new name (without changing extension ${extension}):`);
    
    if (newName) {
      const newFileName = newName.trim() + '.' + extension;
      try {
        await axios.post('http://localhost:5000/rename_file', {
          oldName: currentFileName,
          newName: newFileName
        });
        alert('File renamed successfully!');
        fetchFiles(); // Refresh file list after renaming
        
        // Notify parent component (Page) about file change
        onFileChange();
      } catch (error) {
        console.error('Error renaming file:', error);
      }
    }
  };  

  return (
    <div className="grid grid-cols-2 gap-4">
      {files.map((file, index) => (
        <div key={index} className="flex items-center border border-gray-200 hover:bg-blue-100 p-4 rounded-md mb-2">
          <File size={24} className="mr-4" />
          <div className="flex flex-1 items-center">
            <span
              className="cursor-pointer flex-1"
              onDoubleClick={() => handleDoubleClick(index)}
            >
              {file.name}
            </span>
            <span className="ml-2">{file.size}</span>
            <button className="px-2 py-1 bg-transparent text-red-500 rounded-md ml-2"
                    onClick={() => handleDelete(file.name)}>
              <Trash2 size={24} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileViewer;
