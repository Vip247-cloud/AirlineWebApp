import React from 'react';
import { auth } from '../firebaseConfig'; // Adjust if the firebase config path is different
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/signin'); // Redirect to sign-in page after sign out
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  return (
    <button 
      onClick={handleSignOut} 
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
      aria-label="Sign Out"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
