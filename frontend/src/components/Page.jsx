import React from 'react';

const Page = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        <h1 className="text-3xl font-bold mb-4">SaaS AI-based File Manager</h1>
        <p className="text-gray-600 mb-6">
          Your all-in-one solution for managing and organizing your files with the power of AI.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Page;
