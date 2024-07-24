import React from 'react';
import FileUpload from '../utils/FileUpload';
import { LogIn, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignedIn, useUser } from "@clerk/clerk-react";

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <section className='w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-800 dark:to-gray-900'>
      <div className='container mx-auto pt-20 pb-4'>
        <div className='flex flex-col items-center text-center'>
          <div className='flex mx-auto p-4 items-center'>
            <h1 className='mr-3 text-5xl font-semibold'>Welcome to SaaS <span className='text-blue-500'>File <br/>Manager</span></h1>
          </div>

          {!user && (
            <Link to="/sign-in">
              <button className="flex mt-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                Get Started <LogIn className='pl-2 shake' />
              </button>
            </Link>
          )}

          <p className='max-w-xl mt-2 text-lg text-slate-600'>
            Your all-in-one solution for managing and organizing your files with the power of AI.
          </p>

          <div className='w-full max-w-3xl mt-4 border-dashed border-2 rounded-xl dark:border-gray-800'>
            <FileUpload />
          </div>

          <SignedIn>
            <Link to="/file-viewer">
              <button className="flex mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                View Files <FolderOpen className='pl-2 bounce'/>
              </button>
            </Link>
          </SignedIn>

        </div>
      </div>
    </section>
  );
};

export default Home;
