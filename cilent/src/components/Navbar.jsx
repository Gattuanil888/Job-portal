import React, { useContext, useEffect } from 'react';
import {
    useClerk,
    SignedIn,
    SignedOut,
    UserButton,
    useUser
} from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../pages/context/AppContext';

const Navbar = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser(); // Clerk user object
    const navigate = useNavigate();
    const { setShowRecruiterLogin, isRecruiterLoggedIn, setIsRecruiterLoggedIn, setCompanyToken, setCompanyData } = useContext(AppContext);

    // ✅ Send user info (including image) to backend after login
    useEffect(() => {
        if (user) {
            fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user.id,
                    name: user.fullName,
                    email: user.primaryEmailAddress.emailAddress,
                    image: user.imageUrl,
                }),
            })
                .then((res) => res.json())
                .then((data) => console.log('User saved:', data))
                .catch((err) => console.error('Error saving user:', err));
        }
    }, [user]);

    // Function to handle recruiter logout
    const handleRecruiterLogout = () => {
        setIsRecruiterLoggedIn(false);
        setCompanyToken(""); // Clear the company token
        setCompanyData(null); // Clear company data
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <div className="shadow py-4">
            <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
                <img
                    onClick={() => navigate('/')}
                    className="cursor-pointer"
                    src={assets.logo}
                    alt="Logo"
                />

                <div className="flex items-center gap-4 max-sm:text-xs">
                    {/* Conditional rendering for Recruiter Login/Logout */}
                    {!user && !isRecruiterLoggedIn && ( // Show only if no Clerk user and no recruiter is logged in
                        <button
                            className="text-gray-600"
                            onClick={() => setShowRecruiterLogin(true)}
                        >
                            Recruiter Login
                        </button>
                    )}

                    {isRecruiterLoggedIn && ( // Show Recruiter Logout if a recruiter is logged in
                        <button
                            className="text-gray-600"
                            onClick={handleRecruiterLogout}
                        >
                            Recruiter Logout
                        </button>
                    )}

                    {/* Show this when signed out (Clerk user) */}
                    <SignedOut>
                        {!isRecruiterLoggedIn && ( // Only show Clerk Login if no recruiter is logged in
                            <button
                                onClick={() => openSignIn()}
                                className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full"
                            >
                                Login
                            </button>
                        )}
                    </SignedOut>

                    {/* Show this when signed in (Clerk user) */}
                    <SignedIn>
                        <div className="flex items-center gap-3">
                            {/* Greeting */}
                            <p className="max-sm:hidden text-gray-700 font-medium hidden sm:block">
                                Hi, {user?.firstName} {user?.lastName}
                            </p>

                            {/* Profile Image */}
                            <img
                                src={user?.imageUrl}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border border-gray-300"
                            />
                        </div>

                        {/* Applied Jobs button */}
                        <Link to="/application">
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
