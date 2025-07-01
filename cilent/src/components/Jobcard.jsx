// src/components/JobCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    scrollTo(0, 0);
    navigate(`/apply-job/${job._id}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300">
      {/* ✅ Company Logo */}
      <div className="w-12 h-12 rounded overflow-hidden">
        <img
          src={job?.companyId?.image || '/default-logo.png'}
          alt="Company Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* ✅ Job Title */}
      <h4 className="text-lg font-semibold text-gray-800">{job.title}</h4>

      {/* ✅ Tags */}
      <div className="flex gap-2 text-sm flex-wrap">
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{job.location}</span>
        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">{job.level}</span>
      </div>

      {/* ✅ Description Preview */}
      <p
        className="text-sm text-gray-600"
        dangerouslySetInnerHTML={{ __html: job.description?.slice(0, 150) }}
      ></p>

      {/* ✅ Action Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={handleNavigate}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          Apply now
        </button>
        <button
          onClick={handleNavigate}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
