import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 via-white to-green-400">
        {/* <div className="bg-red-500 text-white p-4">
            If this text has a red background, Tailwind is working!
        </div> */}
        {/* App Name */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-8">
            Welcome to <span className="text-blue-500 hover:text-green-500 transition duration-1000">Dashboard App</span> 🚀
        </h1>
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 hover:text-gray-800">
            Manage everything in one place with ease and efficiency.
        </p>

        {/* Buttons */}
        <div className="flex gap-6">
            <Link to="/login" 
            className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
            >
                Login
            </Link>
            <Link to="/signup"
            className="bg-green-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition duration-300"
            >
                Sign Up
            </Link>
        </div>
    </div>
  );
}
