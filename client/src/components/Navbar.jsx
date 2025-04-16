import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-6 hover:bg-gray-900 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold hover:text-green-100">Dashboard App</h1>
      <button
        onClick={handleLogout}
        className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
