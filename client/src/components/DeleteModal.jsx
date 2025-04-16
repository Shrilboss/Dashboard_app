import React from "react";

function DeleteModal({value,onCancel, onConfirm}){
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
          <p className="mb-4">Are you sure you want to delete this {value}?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => onCancel(null)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
}

export default DeleteModal;