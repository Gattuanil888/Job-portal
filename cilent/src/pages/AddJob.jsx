import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../pages/context/AppContext';
import { toast } from 'react-toastify';

const AddJob = () => {
  const { backendUrl, companyToken } = useContext(AppContext);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Programming',
    location: 'Bangalore',
    level: 'Senior Level',
    salary: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/company/post-job`,
        form,
        {
          headers: {
            token: companyToken,
            'Content-Type': 'application/json',
          },
        }
      );

      if (data.success) {
        toast.success(data.message || 'Job posted successfully');
        setForm({
          title: '',
          description: '',
          category: 'Programming',
          location: 'Bangalore',
          level: 'Senior Level',
          salary: 0,
        });
      } else {
        toast.error(data.message || 'Failed to post job');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-6">Add Job</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Type here"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Job Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Type here"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            required
          />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Job Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Programming</option>
              <option>Design</option>
              <option>Marketing</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Job Location</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>San Francisco</option>
              <option>London</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Job Level</label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option>Senior Level</option>
              <option>Junior Level</option>
              <option>Internship</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium mb-1">Salary</label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            min={0}
            className="w-40 border rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
