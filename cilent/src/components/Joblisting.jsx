/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../pages/context/AppContext.jsx';
import { assets } from '../assets/assets.js';
import JobCard from './Jobcard.jsx';

function Joblisting() {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext);

    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState(jobs);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleLocationChange = (location) => {
        setSelectedLocations(prev =>
            prev.includes(location)
                ? prev.filter(c => c !== location)
                : [...prev, location]
        );
    };

    useEffect(() => {
        const matchesCategory = job =>
            selectedCategories.length === 0 || selectedCategories.includes(job.category);

        const matchesLocation = job =>
            selectedLocations.length === 0 || selectedLocations.includes(job.location);

        const matchesTitle = job =>
            searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

        const matchesSearchLocation = job =>
            searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

        const newFilteredJobs = jobs.slice().reverse().filter(
            job =>
                matchesCategory(job) &&
                matchesLocation(job) &&
                matchesTitle(job) &&
                matchesSearchLocation(job)
        );

        setFilteredJobs(newFilteredJobs);
        setCurrentPage(1);
    }, [jobs, selectedCategories, selectedLocations, searchFilter]);

    const categories = [
        "Programming", 'Marketing', 'Designing',
        'Accounting', 'Analytics'
    ];

    const locations = [
        'Bangalore', 'Hyderabad', 'Mumbai', 'Chennai'
    ];

    return (
        <div className="flex flex-col md:flex-row px-4 md:px-16 py-10 gap-10">
            {/* Sidebar */}
            <div className="w-full md:w-1/4 p-4 border-r border-gray-200 min-h-screen">
                {/* Current Filters */}
                {isSearched && (searchFilter.title || searchFilter.location) && (
                    <>
                        <h3 className="text-md font-semibold mb-2 text-gray-800">Current Search</h3>
                        <div className="flex gap-2 mb-6 flex-wrap">
                            {searchFilter.title && (
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                    {searchFilter.title}
                                    <img
                                        src={assets.cross_icon}
                                        alt="remove"
                                        className="w-3 h-3 cursor-pointer"
                                        onClick={() => setSearchFilter(prev => ({ ...prev, title: '' }))} />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                    {searchFilter.location}
                                    <img
                                        src={assets.cross_icon}
                                        alt="remove"
                                        className="w-3 h-3 cursor-pointer"
                                        onClick={() => setSearchFilter(prev => ({ ...prev, location: '' }))} />
                                </span>
                            )}
                        </div>
                    </>
                )}

                {/* Filter Toggle for Small Screens */}
                <button
                    onClick={() => setShowFilter(prev => !prev)}
                    className="px-6 py-1.5 rounded border border-gray-400 lg:hidden mb-4"
                >
                    {showFilter ? "Close" : "Filters"}
                </button>

                {/* Categories */}
                <div className={`${showFilter ? '' : 'hidden'} lg:block`}>
                    <h3 className="text-md font-semibold mb-2 text-gray-800">Search by Categories</h3>
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex items-center mb-2">
                            <input
                                className='scale-125'
                                type="checkbox"
                                onChange={() => handleCategoryChange(cat)}
                                checked={selectedCategories.includes(cat)}
                            />
                            <label htmlFor={`cat-${idx}`} className="text-sm text-gray-700 ml-2">{cat}</label>
                        </div>
                    ))}
                </div>

                {/* Locations */}
                <div className={`${showFilter ? '' : 'hidden'} lg:block`}>
                    <h3 className="text-md font-semibold mb-2 text-gray-800 mt-4">Search by Location</h3>
                    {locations.map((loc, idx) => (
                        <div key={idx} className="flex items-center mb-2">
                            <input
                                className='scale-125'
                                type="checkbox"
                                onChange={() => handleLocationChange(loc)}
                                checked={selectedLocations.includes(loc)}
                            />
                            <label htmlFor={`loc-${idx}`} className="text-sm text-gray-700 ml-2">{loc}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Job Listings */}
            <section id="job-list" className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">Latest jobs</h3>
                <p className="text-sm text-gray-500 mb-6">Get your desired job from top companies</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {
                        filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))
                    }
                </div>

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className="flex justify-center space-x-2 items-center mt-10">
                        <a href="#job-list">
                            <img
                                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                                src={assets.left_arrow_icon}
                                alt="prev"
                                className="cursor-pointer"
                            />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}
                                >
                                    {index + 1}
                                </button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img
                                onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))}
                                src={assets.right_arrow_icon}
                                alt="next"
                                className="cursor-pointer"
                            />
                        </a>
                    </div>
                )}
            </section>
        </div>
    );
}

export default Joblisting;
