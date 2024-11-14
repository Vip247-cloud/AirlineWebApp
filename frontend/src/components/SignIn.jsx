import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Adjust the import as needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const SignIn = ({ user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [redirectToProfile, setRedirectToProfile] = useState(false);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setRedirectToProfile(true); // Redirect to profile on successful login
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('Sign-in failed. Please check your credentials.');
    }
  };

  if (user || redirectToProfile) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-5">Welcome Back</h2>

        {error && (
          <p className="text-red-600 text-sm text-center bg-red-50 border border-red-300 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
