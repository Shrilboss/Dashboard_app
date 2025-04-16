import React from "react";

const CourseCard = ({course,onEdit,onDelete})=> {
    return (
        <li
        key={course.id}
        className="flex justify-between items-center border-b py-2"
        >
            <div>
                <strong>{course.title}</strong>
                <p className="text-sm text-gray-600">{course.description}</p>
            </div>
            <div className="space-x-2">
                <button
                    onClick={() => onEdit(course)}
                    className="bg-yellow-200 px-2 py-1 rounded hover:bg-yellow-500"
                    >
                    ✏️
                </button>
                <button
                    onClick={() => onDelete(course.id)}
                    className="bg-red-200 text-white px-2 py-1 hover:bg-red-600 rounded"
                    >
                    🗑️
                </button>
            </div>
        </li>
    );
}

export default CourseCard;