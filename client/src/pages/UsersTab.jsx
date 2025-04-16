// src/pages/UsersTab.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import DeleteModal from '../components/DeleteModal';
import Pagination from '../components/Pagination';
import UserForm from '../components/UserForm';

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const [deletingUserId, setDeletingUserId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = localStorage.getItem('token');

  const fetchUsers = useCallback( async () => {
    try{
        const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
    } catch(err) {
        console.error('Error fetching users:', err);
    } 
  }, [token]);

  
  useEffect(() => {
    fetchUsers();
    const timer = setTimeout(() => {
      setSuccess('');
      setError('');
    }, 5000);
    return () => clearTimeout(timer);
  },[fetchUsers,success,error]);

  // Pagination functions
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const handlePage = (page) => setCurrentPage(page);

  //Form handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try{
        if (editingUserId) {
            //Edit user
            await axios.put(`/api/users/${editingUserId}`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('User successfully edited!');
        } else {
            //Create user
            await axios.post('/api/users', form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccess('User successfully created!');
        }
        setForm({ name: '', email: '', password: '' });
        setEditingUserId(null);
        fetchUsers();
    } catch(err) {
        console.log(err.response?.status);
        console.log(err.response?.data);
        if (err.response?.status === 400 && err.response.data.error) {
            setError(err.response.data.error);
        } else {
            setError('An error occurred. Please try again.');
        }
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, password: '' });
    setEditingUserId(user.id);
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    // Reset form and editing state
    setForm({ name: '', email: '', password: '' });
    setEditingUserId(null);
    setError('');
    setSuccess('');
  };
  const handleDelete = async () => {
    setError('');
    setSuccess('');
    if(users.length === 1) {
        setError('You cannot delete the last user.');
        return;
    }
    try{
        await axios.delete(`/api/users/${deletingUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('User successfully deleted!');
        fetchUsers();
    } catch(err) {
        setError('An error occurred while deleting the user.');
        console.error('Error deleting user:', err);
    }  finally {
      setDeletingUserId(null);
    } 
  };

  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">User Management</h2>
        
        {/* Delete Confirmation Modal */}
        {deletingUserId && (
          <DeleteModal
            value="user"
            onCancel={setDeletingUserId}
            onConfirm = {handleDelete}
          />
        )}
        
        {/* Success Message */}
        {success && (
        <div className="bg-green-200 border border-green-900 text-green-900 px-4 py-3 rounded mb-4">
            {success}
        </div>
        )}

        {/* Error Message */}
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
        </div>
        )}

        {/* User Form */}
        <UserForm
          form = {form}
          editingUserId={editingUserId}
          onChange={setForm}
          onSubmit={handleSubmit}
          onCancelEdit={handleCancelEdit} 
        /> 
        
        {/* User Cards*/}
        <div className="grid grid-cols-1 gap-4">
          {paginatedUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={setDeletingUserId}

            />
            ))}
        </div>

        {/* Pagination Controls */}
        {!deletingUserId && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onPage={handlePage}
            />
        )}
    </div>
  );
};

export default UsersTab;
