import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from '@clerk/clerk-react';

const Applyjob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [JobData, setJobData] = useState(null);
  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext);
  const { getToken } = useAuth();
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs/${id}`);
      if (data.success) {
        setJobData(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch job");
    }
  };

  const applyHandler = async () => {
    console.log("Applying for job:", JobData?._id);
console.log("User Data:", userData);

    try {
      if (!userData) return toast.error("Login to apply for jobs");
      if (!userData.resume) {
        toast.error("Upload resume to apply");
        return navigate('/applications');
      }

      const alreadyApplied = userApplications.some(app => app.jobId._id === JobData._id);
      if (alreadyApplied) return toast.info("You already applied to this job");

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId: JobData._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Job application submitted!");
        console.log("Fetching applications after apply...");
        await fetchUserApplications();
        console.log("Current Applications:", userApplications);
        checkAlreadyApplied();
      } else {
        toast.error(data.message || "Failed to apply");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleSidebarApply = async (jobId) => {
    try {
      if (!userData) return toast.error("Login to apply for jobs");
      if (!userData.resume) {
        toast.error("Upload resume to apply");
        return navigate('/applications');
      }

      const alreadyApplied = userApplications.some(app => app.jobId._id === jobId);
      if (alreadyApplied) return toast.info("You already applied to this job");

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/apply`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Job application submitted!");
        await fetchUserApplications();
      } else {
        toast.error(data.message || "Failed to apply");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId._id === JobData._id);
    setIsAlreadyApplied(hasApplied);
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied();
    }
  }, [JobData, userApplications]);

  if (!JobData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Main Job Details */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <img
                  src={JobData.companyId?.image || "/default-logo.png"}
                  alt="Company Logo"
                  className="w-14 h-14 rounded"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{JobData.title}</h2>
                  <div className="flex gap-2 text-sm text-gray-600 flex-wrap">
                    <span className="bg-gray-100 px-2 py-1 rounded">{JobData.companyId?.name || "Unknown"}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{JobData.location}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{JobData.level}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">CTC: {JobData.salary}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button onClick={applyHandler} className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                  {isAlreadyApplied ? "Already Applied" : "Apply now"}
                </button>
                <p className="text-xs text-gray-400 mt-1">Posted just now</p>
              </div>
            </div>

            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Job description</h3>
              <div
                className="rich-text"
                dangerouslySetInnerHTML={{ __html: JobData.description }}
              />
            </section>
          </div>
        </div>

        {/* Sidebar Suggestions */}
        <div className="space-y-4">
          {jobs
          .filter(job => !userApplications.some(app => app.jobId._id === job._id))
          .slice(0, 3).map((job, i) => (
            <div key={i} className="bg-white p-4 shadow rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={job.companyId?.image || '/default-logo.png'}
                  alt="logo"
                  className="w-8 h-8"
                />
                <h4 className="font-medium">{job.title}</h4>
              </div>
              <div className="flex gap-2 text-xs text-gray-600 mb-2">
                <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{job.level}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {job.description?.substring(0, 60)}...
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSidebarApply(job._id)}
                  className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                >
                  {userApplications.some(app => app.jobId._id === job._id) ? 'Already Applied' : 'Apply Now'}
                </button>
                <button className="text-sm text-blue-600 hover:underline">Learn more</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Applyjob;
