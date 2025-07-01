import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from './context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Viewapplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [applicants, setApplicants] = useState([]);
  const [openActionIndex, setOpenActionIndex] = useState(null);

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/applicants`, {
        headers: { token: companyToken },
      });

      if (data.success) {
        setApplicants(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to load applications");
    }
  };

  const changeJobApplicantionStatus = async (id, status) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/company/change-status`,
        { id, status },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        fetchCompanyJobApplications();
        toast.success("Status updated");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  const toggleDropdown = (index) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">View Applications</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">User</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Job Title</th>
              <th className="py-3 px-4 text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 text-left">Resume</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {applicants.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No applications found
                </td>
              </tr>
            ) : (
              applicants.map((applicant, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      src={applicant.userId?.image || '/default-avatar.png'}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{applicant.userId?.name || 'N/A'}</span>
                  </td>
                  <td className="py-3 px-4 max-sm:hidden">
                    {applicant.jobId?.title || 'N/A'}
                  </td>
                  <td className="py-3 px-4 max-sm:hidden">
                    {applicant.jobId?.location || 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={applicant.userId?.resume || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      Resume
                      <img
                        src={assets.resume_download_icon}
                        alt="download"
                        className="w-4 h-4"
                      />
                    </a>
                  </td>
                  <td className="py-3 px-4 relative">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          applicant.status === "Accepted"
                            ? "bg-green-100 text-green-600"
                            : applicant.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {applicant.status || "Pending"}
                      </span>
                      <button
                        onClick={() => toggleDropdown(index)}
                        className="text-lg font-bold px-2 py-1 rounded hover:bg-gray-200"
                      >
                        ⋯
                      </button>
                    </div>

                    {openActionIndex === index && (
                      <div className="absolute right-0 mt-1 bg-white border rounded shadow z-10 min-w-[100px]">
                        <button
                          onClick={() =>
                            changeJobApplicantionStatus(applicant._id, 'Accepted')
                          }
                          className="block w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 text-sm"
                          disabled={applicant.status === "Accepted"}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            changeJobApplicantionStatus(applicant._id, 'Rejected')
                          }
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                          disabled={applicant.status === "Rejected"}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewapplications;
