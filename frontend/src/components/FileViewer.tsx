import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { File, Folder, Trash2, FolderPlus } from 'lucide-react';

const FileViewer: React.FC<{ onFileChange: () => void }> = ({ onFileChange }) => {
  const [files, setFiles] = useState<{ name: string; size: string | null; type: string; }[]>([]);

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

  const handleDelete = async (itemName: string, itemType: string) => {
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      try {
        await axios.post(`http://localhost:5000/delete_${itemType}`, { [itemType]: itemName });

        // Optimistically update UI
        const updatedFiles = files.filter(file => file.name !== itemName);
        setFiles(updatedFiles);

        // Notify parent component (Page) about file change
        onFileChange();

        // Alert after successful deletion
        window.alert(`${itemType.charAt(0).toUpperCase() + itemType.slice(1)} ${itemName} deleted successfully!`);
      } catch (error) {
        console.error(`Error deleting ${itemType}:`, error);
      }
    }
  };

  const handleDoubleClick = async (index: number) => {
    const currentFileName = files[index].name;
    const newName = prompt('Enter new name:');

    if (newName) {
      const newFileName = newName.trim();
      if (!newFileName) return; // Avoid empty names

      try {
        await axios.post('http://localhost:5000/rename_file', {
          oldName: currentFileName,
          newName: newFileName
        });
        alert('Item renamed successfully!');
        fetchFiles(); // Refresh file list after renaming
        
        // Notify parent component (Page) about file change
        onFileChange();
      } catch (error) {
        console.error('Error renaming item:', error);
      }
    }
  };

  const handleAddFolder = async () => {
    const folderName = prompt('Enter new folder name:');

    if (folderName) {
      try {
        await axios.post('http://localhost:5000/create_folder', { folder: folderName.trim() });
        alert('Folder created successfully!');
        fetchFiles(); // Refresh file list after adding new folder
        
        // Notify parent component (Page) about file change
        onFileChange();
      } catch (error) {
        console.error('Error creating folder:', error);
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {files.map((file, index) => (
        <div key={index} className="flex items-center border border-gray-200 hover:bg-blue-100 dark:border-gray-500 dark:hover:text-black p-4 rounded-md mb-2">
          {file.type === 'folder' ? <Folder size={24} className="mr-4" /> : <File size={24} className="mr-4" />}
          <div className="flex flex-1 items-center">
            <span
              className="cursor-pointer flex-1"
              onDoubleClick={() => handleDoubleClick(index)}
            >
              {file.name}
            </span>
            {file.size && <span className="text-gray-500 ml-4">{file.size}</span>}
          </div>
          <Trash2
            size={24}
            className="cursor-pointer text-red-500 ml-4"
            onClick={() => handleDelete(file.name, file.type)}
          />
        </div>
      ))}
      <button
        onClick={handleAddFolder}
        className="flex items-center justify-center border-none bg-green-200 hover:bg-green-300 dark:bg-green-900 dark:hover:bg-green-700 p-4 rounded-md mb-2"
      >
        <FolderPlus size={24} className="mr-4" />
          Add Folder
      </button>
    </div>
  );
};

export default FileViewer;
