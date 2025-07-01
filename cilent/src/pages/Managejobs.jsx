import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './context/AppContext';
import { toast } from 'react-toastify';

const Managejobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  const { backendUrl, companyToken } = useContext(AppContext);

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-jobs`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch jobs');
    }
  };

  // ✅ Function to toggle visibility
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/change-visibility`,
        { id },
        {
          headers: { token: companyToken },
        }
      );

      if (data.success) {
        toast.success('Visibility updated');
        fetchCompanyJobs(); // Refresh jobs
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

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
          {jobs.map((job, index) => (
            <tr key={index} className="border-t border-gray-200 text-sm">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{job.title}</td>
              <td className="p-3">{moment(job.date).format('DD MMM, YYYY')}</td>
              <td className="p-3">{job.location}</td>
              <td className="p-3">{job.applicants?.length || 0}</td>
              <td className="p-3">
                <input
                  type="checkbox"
                  checked={job.visible}
                  onChange={() => changeJobVisibility(job._id)}
                />
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
