import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const SignInPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <SignIn />
    </div>
  );
};

export default SignInPage;
