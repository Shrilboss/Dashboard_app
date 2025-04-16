import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import DeleteModal from '../components/DeleteModal';
import Pagination from '../components/Pagination';
import CourseForm from '../components/CourseForm';

const CoursesTab = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const token = localStorage.getItem('token');

  const fetchCourses = useCallback( async () => {
    try {
      const res = await axios.get('/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  },[token]);

  useEffect(() => {
    fetchCourses();
    const timer = setTimeout(() => {
      setSuccess('');
      setError('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [fetchCourses,success,error]);

  // Pagination functions
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage(p => Math.min(totalPages, p + 1));
  const handlePage = (page) => setCurrentPage(page);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
        if (editingId) {
            //Edit Course
            await axios.put(`/api/courses/${editingId}`, form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Course successfully edited!');
        } else {
            //Create Course
            await axios.post('/api/courses', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSuccess('Course successfully created!');
        }
        setForm({ title: '', description: '' });
        setEditingId(null);
        fetchCourses();
    } catch (err) {
        console.error('Error saving course:', err);
        setError(err.response.data.error);
    }
  };

  const handleEdit = (course) => {
    setForm({ title: course.title, description: course.description });
    setEditingId(course.id);
    setError('');
    setSuccess('');
  };

  const handleCancelEdit = () => {
    // Reset form and editing state
    setForm({ title: '', description: '' });
    setEditingId(null);
    setError('');
    setSuccess('');
  };
  const handleDelete = async () => {
    setError('');
    setSuccess('');
    try {
        await axios.delete(`/api/courses/${deletingCourseId}`, {
        headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Course successfully deleted!');
        fetchCourses();
    } catch (err) {
        setError('An error occurred while deleting the course.');
        console.error('Error deleting course:', err);
    } finally {
      setDeletingCourseId(null);
    }
  };


  return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Course Management</h2>

        {/* Delete Confirmation Modal */}
        {deletingCourseId && (
          <DeleteModal
            value = "course"
            onCancel={setDeletingCourseId}
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

        {/* Course Form */}
        <CourseForm
            form={form}
            editingId={editingId}
            onChange={setForm}
            onSubmit={handleSubmit}
            onCancelEdit={handleCancelEdit}
        />
        
        {/* Course Cards*/}
        <ul className="space-y-3">
          {courses.length!=0 ? '' : 'No courses found'}
          {paginatedCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={handleEdit}
                onDelete={setDeletingCourseId}

              />
          ))}
        </ul>
        
        {/* Pagination Controls */}
        {!deletingCourseId && (
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

export default CoursesTab;
