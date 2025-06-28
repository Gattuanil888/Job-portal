import React, { useContext } from 'react';
import { useClerk, SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../pages/context/AppContext';

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  const navigate = useNavigate()
   
   const {setShowRecruiterLogin} = useContext(AppContext)


  return (
    <div className="shadow py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <img onClick={()=> navigate('/')} className ='cursor-pointer'src={assets.logo} alt="Logo" />

        <div className="flex items-center gap-4 max-sm:text-xs">
          <button className="text-gray-600"
          onClick={() => setShowRecruiterLogin(true)}>Recruiter Login</button>

          {/* Show this when signed out */}
          <SignedOut>
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
            >
              Login
            </button>
          </SignedOut>

          {/* Show this when signed in */}
          <SignedIn>
            {/* Greeting */}
            <p className=" max-sm:hidden text-gray-700 font-medium hidden sm:block">
              Hi, {user?.firstName} {user?.lastName}
            </p>

            {/* Applied Jobs button */}
            <Link to="/application">
             <p></p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-full">
                Applied Jobs
              </button>
            </Link>

            {/* User menu */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
