// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';

function Header({ facultyName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('facultyName');
    navigate('/');
  };

  return (
    <header className="flex justify-between items-center bg-blue-900 text-white p-4">
      <div className="flex items-center space-x-3">
        {/* Back Icon */}
        <button onClick={() => navigate(-1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        {/* NITK Logo */}
        <img src="/New_NITK_Logo-1.png" alt="NITK Logo" className="h-10 w-10" />
        <div className="text-xl font-bold">INFORMATION TECHNOLOGY DEPARTMENT</div>
      </div>
      <div className="flex items-center space-x-4">
        <NotificationDropdown />
        {/* Profile and Logout */}
        <img
          src="/public/New_NITK_Logo-1.png"
          alt="Profile"
          className="rounded-full h-10 w-10"
        />
        <div className="text-md">{facultyName || 'Faculty Name'}</div>
        <button onClick={handleLogout} className="ml-4 text-white underline">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
