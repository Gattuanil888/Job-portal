import React, { useState, useContext, use, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AppContext } from '../pages/context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Application = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserData ,fetchUserApplications } = useContext(AppContext);

  const handleSave = async () => {
    if (!selectedFile) {
      toast.error("Please select a resume file.");
      return;
    }

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("resume", selectedFile);

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Resume uploaded successfully!");
        await fetchUserData();
        setIsEdit(false);
        setSelectedFile(null);
      } else {
        toast.error(data.message || "Failed to upload resume.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };
   useEffect(()=>{
        
       if(user){
           fetchUserApplications()
       }

   },[user])

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Your Resume</h2>

        <div className="flex items-center gap-4 mb-8 flex-wrap">
          {userData?.resume ? (
            <a
              href={userData.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded"
            >
              View Resume
            </a>
          ) : (
            <span className="text-gray-500">No resume uploaded</span>
          )}

          <button
            className="border border-gray-300 px-4 py-2 rounded"
            onClick={() => {
              setIsEdit((prev) => !prev);
              setSelectedFile(null);
            }}
          >
            {isEdit ? "Cancel" : "Edit"}
          </button>

          {isEdit && (
            <div className="flex gap-3 items-center">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="block file:mr-4 file:py-2 file:px-4 file:border file:rounded file:border-blue-600 file:text-blue-600"
              />
              {selectedFile && (
                <p className="text-sm text-gray-600">Selected: {selectedFile.name}</p>
              )}
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
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {userApplications.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">
                    No job applications found.
                  </td>
                </tr>
              ) : (
                userApplications.map((app, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 flex items-center gap-2">
                      <img
                        src={app.companyIdId?.image || "/default-logo.png"}
                        alt={app.companyIdId?.name || "Company"}
                        className="w-6 h-6"
                      />
                      <span>{app.companyId?.name || "Unknown"}</span>
                    </td>
                    <td className="p-3">{app.jobId?.title || "Untitled"}</td>
                    <td className="p-3">{app.jobId?.location || "N/A"}</td>
                    <td className="p-3">
                      {new Date(app.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`${
                          app.status === 'Accepted'
                            ? 'bg-green-100 text-green-700'
                            : app.status === 'Rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                        } px-3 py-1 rounded text-sm font-medium`}
                      >
                        {app.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Application;
