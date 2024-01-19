import React from 'react';

import FileUpload from './FileUpload';

const Home = () => {
  return (
    <section className='w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='flex flex-col items-center text-center'>
                <div className='flex mx-auto p-4 items-center'>
                    <h1 className='mr-3 text-5xl font-semibold'>Welcome to SaaS File Manager</h1>
                </div>

                <button className="flex mt-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Get Started
                </button>

                <p className='max-w-xl mt-2 text-lg text-slate-600'>
                    Your all-in-one solution for managing and organizing your files with the power of AI.
                </p>

                <div className='w-full mt-4 border-dashed border-2 rounded'>
                    <FileUpload />
                </div>
                
            </div>
        </div>
    </section>
  );
};

export default Home;