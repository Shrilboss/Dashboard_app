import React from "react";

function CourseForm({form,editingId,onChange,onSubmit,onCancelEdit}) {
    return (
        <form onSubmit={onSubmit} className="space-y-3 mb-6">
        <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => onChange({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded hover:bg-blue-100"
            required
        />
        <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => onChange({ ...form, description: e.target.value })}
            className="w-full border p-2 rounded hover:bg-blue-100"
            required
        />
        <div className="flex gap-4">
            <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
                {editingId ? 'Update' : 'Add'} Course
            </button>
            
            {/* Cancel Edit Button */}
            {editingId && (
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

export default CourseForm;