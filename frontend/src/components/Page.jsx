import React from 'react';
import { ArrowDownUp } from 'lucide-react';
import FileViewer from './FileViewer';

const Page = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl min-w-[70vw] relative">
        <h1 className="text-2xl pb-2 mb-4">SaaS AI-based File Manager</h1>

        <div className="flex items-center mb-4">
          <span className="mr-2">Sort</span>
          <ArrowDownUp className="mr-2" />
        </div>

        <div className='mt-4 p-4 bg-gray-100'>
          <FileViewer />
        </div>
        
      </div>
    </div>
  );
};

export default Page;
