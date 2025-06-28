import React from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Managejobs = () => {
  const navigate = useNavigate(); // Initialize navigate here

  return (
    <div className="container p-4 max-w-5xl mx-auto">
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Job Title</th>
            <th className="p-3">Date</th>
            <th className="p-3">Location</th>
            <th className="p-3">Applicants</th>
            <th className="p-3">Visible</th>
          </tr>
        </thead>
        <tbody>
          {manageJobsData.map((job, index) => (
            <tr key={index} className="border-t border-gray-200 text-sm">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{job.title}</td>
              <td className="p-3">{moment(job.date).format('DD MMM, YYYY')}</td>
              <td className="p-3">{job.location}</td>
              <td className="p-3">{job.applicants}</td>
              <td className="p-3">
                <input type="checkbox" checked={job.visible} readOnly />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Job Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => navigate('/dashboard/add-job')}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add new job
        </button>
      </div>
    </div>
  );
};

export default Managejobs;
