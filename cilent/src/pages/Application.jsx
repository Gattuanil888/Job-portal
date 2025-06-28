import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { jobsApplied  } from '../assets/assets';
import Footer from '../components/Footer';

const Application = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      case 'Pending':
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      console.log('Saved file:', selectedFile.name);
    }
    setIsEdit(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Your Resume</h2>

        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <a href="#" className="bg-blue-100 text-blue-600 px-4 py-2 rounded">
            resume
          </a>
          <button
            className="border border-gray-300 px-4 py-2 rounded"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>

          {isEdit && (
            <div className="flex gap-3 items-center">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="block file:mr-4 file:py-2 file:px-4 file:border file:rounded file:border-blue-600 file:text-blue-600"
              />
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-4">Jobs Applied</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-700">
                <th className="p-3">Company</th>
                <th className="p-3">Job Title</th>
                <th className="p-3">Location</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {jobsApplied .map((job, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3 flex items-center gap-2">
                    <img src={job.logo} alt={job.company} className="w-6 h-6" />
                    <span>{job.company}</span>
                  </td>
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">{job.date}</td>
                  <td className="p-3">
                    <span
  className={`${job.status === 'Accepted'
    ? 'bg-green-100'
    : job.status === 'Rejected'
    ? 'bg-red-100'
    : 'bg-blue-100'} px-3 py-1 rounded text-sm font-medium`}
>
  {job.status}
</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Application;
