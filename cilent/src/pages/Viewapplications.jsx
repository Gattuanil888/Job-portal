import React, { useState } from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const Viewapplications = () => {
  const [openActionIndex, setOpenActionIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  const handleAction = (action, name) => {
    alert(`${action} application of ${name}`);
    setOpenActionIndex(null);
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
            {viewApplicationsPageData.map((applicant, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  <img
                    src={applicant.imgSrc}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{applicant.name}</span>
                </td>
                <td className="py-3 px-4 max-sm:hidden">{applicant.jobTitle}</td>
                <td className="py-3 px-4 max-sm:hidden">{applicant.location}</td>
                <td className="py-3 px-4">
                  <a
                    href={applicant.resumeUrl || '#'}
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
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="text-lg font-bold px-2 py-1 rounded hover:bg-gray-200"
                  >
                    ⋯
                  </button>
                  {openActionIndex === index && (
                    <div className="absolute right-0 mt-1 bg-white border rounded shadow z-10 min-w-[100px]">
                      <button
                        onClick={() => handleAction('Accepted', applicant.name)}
                        className="block w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction('Rejected', applicant.name)}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewapplications;
