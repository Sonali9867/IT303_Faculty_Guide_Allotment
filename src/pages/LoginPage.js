// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [facultyName, setFacultyName] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('facultyName', facultyName);
    navigate('/course-selection');
  };

  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center bg-blue-900 text-white p-4">
        <div className="flex items-center space-x-3">
          {/* NITK Logo */}
          <img src="/New_NITK_Logo-1.png" alt="NITK Logo" className="h-10 w-10" />
          <div className="text-xl font-bold">INFORMATION TECHNOLOGY DEPARTMENT</div>
        </div>
      </header>
      {/* Login Form */}
      <section className="flex justify-center items-center h-screen">
        <div className="bg-white p-10 rounded shadow-lg w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              placeholder="Faculty Name"
              className="mb-4 p-3 bg-gray-100 rounded w-full border border-gray-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-6 p-3 bg-gray-100 rounded w-full border border-gray-300"
              required
            />
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 text-white py-3 w-full rounded"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
