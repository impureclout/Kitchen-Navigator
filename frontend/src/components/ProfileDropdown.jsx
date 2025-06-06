import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, Cog8ToothIcon, BookmarkSquareIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'; // Using solid icons for clarity

const ProfileDropdown = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-800 focus:ring-emerald-500 transition"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <UserCircleIcon className="h-7 w-7" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            <div className="px-4 py-2 border-b border-neutral-200">
                <p className="text-sm text-neutral-500">Signed in as</p>
                {/* In a real app, you'd fetch and display the user's email here */}
                <p className="text-sm font-medium text-neutral-800 truncate">user@example.com</p>
            </div>
            <Link
              to="/saved-menus"
              onClick={() => setIsOpen(false)}
              className="text-neutral-700 group flex items-center w-full px-4 py-2 text-sm hover:bg-neutral-100"
              role="menuitem"
            >
              <BookmarkSquareIcon className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500" />
              Saved Menus
            </Link>
            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="text-neutral-700 group flex items-center w-full px-4 py-2 text-sm hover:bg-neutral-100"
              role="menuitem"
            >
              <Cog8ToothIcon className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500" />
              Settings
            </Link>
            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="text-neutral-700 group flex items-center w-full px-4 py-2 text-sm hover:bg-neutral-100"
              role="menuitem"
            >
                <ArrowLeftStartOnRectangleIcon className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 