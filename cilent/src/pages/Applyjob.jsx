import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "./context/AppContext";
import { useParams, Link } from "react-router-dom";
import { jobsData } from "../assets/assets";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Applyjob = () => {
  const { id } = useParams();
  const [JobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchJob = () => {
    const data = jobs.filter((job) => String(job._id) === String(id));
    if (data.length !== 0) {
      setJobData(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
  }, [id, jobs]);

  if (!JobData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
       <div className="min-h-screen bg-gray-50">
      {/* ✅ Custom Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <img
                  src="https://logo.clearbit.com/slack.com"
                  alt="Company Logo"
                  className="w-14 h-14 rounded"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{JobData.title}</h2>
                  <div className="flex gap-2 text-sm text-gray-600 flex-wrap">
                    <span className="bg-gray-100 px-2 py-1 rounded">Slack</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">California</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Senior level</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">CTC: {JobData.salary || "$80k"}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Apply now</button>
                <p className="text-xs text-gray-400 mt-1">Posted 25 mins ago</p>
              </div>
            </div>
 
            {/* Job Description */}
<section className="mt-6">
  <h3 className="text-lg font-semibold mb-2">Job description</h3>
  
  <div
  className="rich-text"
  dangerouslySetInnerHTML={{ __html: JobData.description }}
/>
</section>


            {/* Responsibilities
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Key responsibility</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                {(JobData.responsibilities || []).map((res, i) => <li key={i}>{res}</li>)}
              </ol>
            </section> */}

            {/* Skills
            <section className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Skills required</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-1">
                {(JobData.skills || []).map((skill, i) => <li key={i}>{skill}</li>)}
              </ol>
            </section> */}

            <div className="mt-6">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Apply now
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: More Jobs */}
        <div className="space-y-4">
          {["Frontend", "Backend", "Website"].map((role, i) => (
            <div key={i} className="bg-white p-4 shadow rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src="https://logo.clearbit.com/slack.com"
                  alt="logo"
                  className="w-8 h-8"
                />
                <h4 className="font-medium">{role} developer</h4>
              </div>
              <div className="flex gap-2 text-xs text-gray-600 mb-2">
                <span className="bg-gray-100 px-2 py-1 rounded">California</span>
                <span className="bg-gray-100 px-2 py-1 rounded">Senior level</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                You will be responsible for frontend and backend development tasks.
              </p>
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700">
                  Apply now
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
