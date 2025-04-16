import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  //Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // At least 8 chars, 1 uppercase, 1 number
    return passwordRegex.test(password);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form fields
    if (!validateEmail(form.email)) {
        setError('Please enter a valid email address.');
        return;
    }
    if (!validatePassword(form.password)) {
        setError('Password must be at least 8 characters long, include one uppercase letter and one number.');
        return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      if(res.status === 201){
        setSuccess('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000); // Redirect after 3 seconds
      }
    } catch (err) {
        console.log(err);
        // Handle duplicate email error
        if (err.response?.status === 400 && err.response.data.error) {
            setError(err.response.data.error); // "User already exists..."
        } else {
            setError('Signup failed. Please try again.');
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-white to-blue-400">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Form Heading */}
        <h2 className="text-3xl font-bold text-gray-800 text-center">Create Your Account</h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
                
        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {success}
          </div>
        )}

        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="w-full mt-1 p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Password Input */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full mt-1 p-3 border border-gray-500 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-6  00 transition duration-300"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-sm text-gray-600 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>

        {/* Back to Landing Page Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full bg-green-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-green-300 transition duration-300 mt-4"
        >
          Back to Landing Page
        </button>
      </form>
    </div>
  );
}