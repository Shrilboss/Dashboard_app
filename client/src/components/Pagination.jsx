import React from "react";

function Pagination({ currentPage, totalPages, onPrevious, onNext, onPage }) {
    return (
        <div className="flex justify-between items-center">
            <button
                onClick={onPrevious}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
                ← Previous
            </button>    

            <div className="flex space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPage(index + 1)}
                    className={`w-8 h-8 rounded-full ${currentPage === index + 1 ? 
                    'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                    {index + 1}
                </button>
                ))}
            </div>
    
            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
                Next →
            </button>
        </div>  
    );
}

export default Pagination;