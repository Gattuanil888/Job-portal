// src/components/JobCard.jsx
import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const { title, location, level, description, companyIcon } = job;

   const navigate =useNavigate()
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300">
      <div className="w-10 h-10">
        <img
          src={companyIcon || assets.company_icon}
          alt="Company"
          className="w-full h-full object-contain"
        />
      </div>

      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>

      <div className="flex gap-2 text-sm">
        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{location}</span>
        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">{level}</span>
      </div>

      <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: description.slice(0, 150) }}></p>

      <div className="flex gap-2 mt-auto">
        <button onClick ={ () => { navigate(`/apply-job/${job._id}`); scrollTo(0,0)}}className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">Apply now</button>
        <button onClick ={ () => { navigate(`/apply-job/${job._id}`); scrollTo(0,0)}}className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">Learn more</button>
      </div>
    </div>
  );
};

export default JobCard;
