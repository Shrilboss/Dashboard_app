import React from 'react';

const UserCard = ({user, onEdit, onDelete}) => {
    // {paginatedUsers.map(user => (
    return (
        <div key = {user.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(user)}
                className="bg-yellow-200 px-2 py-1 rounded hover:bg-yellow-500"
                >
                ✏️
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="bg-red-200 text-white px-2 py-1 hover:bg-red-600 rounded"
                >
                🗑️
              </button>
            </div>
          </div>
        </div>
    );
}

export default UserCard;
{/* <div className="grid grid-cols-1 gap-4"> */}
