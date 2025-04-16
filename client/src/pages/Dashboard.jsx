// import UsersTab from './Dashboard/UsersTab';
// import CoursesTab from './Dashboard/CoursesTab';
import UsersTab from './UsersTab';
import CoursesTab from './CoursesTab';
import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    // const [activeTab, setActiveTab] = useState('users');
  
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-green-400 via-white to-blue-400">
        {/* <h1 className="text-3xl font-bold mb-6">Dashboard</h1> */}
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Users Panel */}
            <div className=" bg-gradient-to-br from-green-100 via-white to-blue-200 rounded-xl shadow-xl p-6">
              {/* <h2 className="text-2xl font-bold mb-4 text-gray-800">User Management</h2> */}
              <UsersTab />
            </div>

            {/* Courses Panel */}
            <div className=" bg-gradient-to-br from-green-100 via-white to-blue-200 rounded-xl shadow-xl p-6">
              {/* <h2 className="text-2xl font-bold mb-4 text-gray-800">Course Management</h2> */}
              <CoursesTab />
            </div>
          </div>
        </div>
        {/* <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white border hover:bg-blue-100'}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded ${activeTab === 'courses' ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-white border hover:bg-blue-100'}`}
          >
            Courses
          </button>
        </div>
  
        <div className="shadow p-4 rounded bg-gradient-to-br from-green-100 via-white to-blue-100">
          {activeTab === 'users' ? <UsersTab /> : <CoursesTab />}
        </div>*/}
      </div>
    );
  };
  
  export default Dashboard;