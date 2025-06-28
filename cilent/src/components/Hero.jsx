import React, { useRef, useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../pages/context/AppContext';

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    const title = titleRef.current.value;
    const location = locationRef.current.value;

    setSearchFilter({ title, location });
    setIsSearched(true);

    console.log({ title, location });
  };

  return (
    <div className="container 2xl:px-20 px-4 mx-auto my-10">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white rounded-xl p-8 md:p-16 shadow-lg">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Over 100,000 Jobs to Apply
        </h2>
        <p className="text-sm sm:text-base mb-6 text-gray-200">
          Your future is in your hands
        </p>

        {/* Search Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center bg-white rounded-lg overflow-hidden px-3">
            <img src={assets.search_icon} alt="search" className="w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="text-sm text-gray-700 p-2 w-full outline-none"
              ref={titleRef}
            />
          </div>

          <div className="flex items-center bg-white rounded-lg overflow-hidden px-3">
            <img src={assets.location_icon} alt="location" className="w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Location"
              className="text-sm text-gray-700 p-2 w-full outline-none"
              ref={locationRef}
            />
          </div>

          <button
            onClick={onSearch}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg px-6 py-2 w-full"
          >
            Search
          </button>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="mt-12">
        <div className="bg-white rounded-xl shadow-md px-6 py-4 flex items-center gap-6 overflow-x-auto">
          <p className="text-gray-500 text-sm font-medium whitespace-nowrap">
            Trusted by
          </p>
          <div className="flex items-center flex-wrap gap-6">
            <img src={assets.microsoft_logo} alt="Microsoft" className="h-6 object-contain" />
            <img src={assets.walmart_logo} alt="Walmart" className="h-6 object-contain" />
            <img src={assets.accenture_logo} alt="Accenture" className="h-6 object-contain" />
            <img src={assets.amazon_logo} alt="Amazon" className="h-6 object-contain" />
            <img src={assets.adobe_logo} alt="Adobe" className="h-6 object-contain" />
            <img src={assets.samsung_logo} alt="Samsung" className="h-6 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
