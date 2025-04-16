import React from "react";

function UserForm ({ form, editingUserId, onChange, onSubmit, onCancelEdit }){
    return (
        <form onSubmit={onSubmit} className="mb-6 space-y-2">
            <input
                className="border px-2 py-1 w-full rounded hover:bg-blue-100"
                placeholder="Name"
                value={form.name}
                onChange={(e) => onChange({ ...form, name: e.target.value })}
                required
            />
            <input
                className="border px-2 py-1 w-full rounded hover:bg-blue-100"
                placeholder="Email"
                value={form.email}
                onChange={(e) => onChange({ ...form, email: e.target.value })}
                required
            />
            <input
                className="border px-2 py-1 w-full rounded hover:bg-blue-100"
                placeholder="Password"
                type="password"
                value={form.password}
                onChange={(e) => onChange({ ...form, password: e.target.value })}
                required={!editingUserId}
            />
            <div className="flex gap-4">
                <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
                    {editingUserId ? 'Update' : 'Create'} User
                </button>
                
                {/* Cancel Edit Button */}
                {editingUserId && (
                    <button
                    type="button"
                    onClick={onCancelEdit}
                    className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                    Cancel Edit
                    </button>
                )}
            </div>
        </form>
    );
}

export default UserForm;