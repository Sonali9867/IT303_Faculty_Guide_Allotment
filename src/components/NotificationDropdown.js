// src/components/NotificationDropdown.js
import React, { useState, useRef, useEffect } from 'react';

function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M15 17h5l-1.405-1.405A2.032 2.032 0
               0118 14.158V11a6 6 0 10-12 0v3.159c0
               .538-.214 1.055-.595 1.437L4 17h5m6
               0v1a3 3 0 11-6 0v-1m6 0H9"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-20">
          <ul className="list-disc list-inside p-4 text-black">
            <li>Clash with Student A (Cluster 1)</li>
            <li>Clash with Student F (Cluster 2)</li>
            <li>Review assigned students by deadline</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
