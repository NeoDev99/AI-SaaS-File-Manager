import React from 'react';

const About: React.FC = () => {
  return (
    <section className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto pt-20 pb-4">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-800 dark:text-gray-600">
          Meet the team that built this website
        </p>
      </div>
    </section>
  );
};

export default About;
