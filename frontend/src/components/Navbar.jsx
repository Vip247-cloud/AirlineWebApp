import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the path if necessary

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin'); // Redirects to sign-in page upon successful sign-out
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold tracking-wide">
          Flight Booker
        </Link>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Sign Out
              </button>
              <Link to="/search" className="hover:underline">
                Search Flights
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="hover:underline">
                Sign In
              </Link>
              <Link to="/signup" className="hover:underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
