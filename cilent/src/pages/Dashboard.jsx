import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="shadow py-4 bg-white">
        <div className="px-5 flex justify-between items-center">
          <img
            onClick={() => navigate('/')}
            className="max-sm:w-32 cursor-pointer"
            src={assets.logo}
            alt="Logo"
          />
          <p className="text-gray-700 font-medium">Welcome, Prasad</p>
          <div className="relative flex items-center gap-2">
            <img src={assets.company_icon} alt="Company" className="w-10 h-10 rounded-full" />
            <ul className="text-sm text-gray-600">
              <li className="cursor-pointer hover:text-red-500">Logout</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sidebar + Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-60 min-h-screen border-r">
          <ul className="flex flex-col pt-5 text-sm text-gray-600">
            <NavLink
              to="/dashboard/add-job"
              className={({ isActive }) =>
                `flex items-center p-3 gap-2 hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`
              }
            >
              <img className ='min-w-4'src={assets.add_icon} alt="" />
              <p className=' max-sm-hidden'>Add Job</p>
            </NavLink>

            <NavLink
              to="/dashboard/manage-jobs"
              className={({ isActive }) =>
                `flex items-center p-3 gap-2 hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`
              }
            >
              <img className ='min-w-4'src={assets.home_icon} alt="" />
              <p className=' max-sm-hidden'>Manage Jobs</p>
            </NavLink>

            <NavLink
              to="/dashboard/view-applications"
              className={({ isActive }) =>
                `flex items-center p-3 gap-2 hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`
              }
            >
              <img className ='min-w-4' src={assets.person_tick_icon} alt="" />
              <p className=' max-sm-hidden'>View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Right Content Pane */}
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
