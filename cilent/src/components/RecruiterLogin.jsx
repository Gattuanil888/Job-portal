import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../pages/context/AppContext';

const RecruiterLogin = () => {
  const { setShowRecruiterLogin } = useContext(AppContext);

  const [state, setState] = useState('Login'); // or 'Signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log({ name, email, password });

    // Simulate closing modal after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setShowRecruiterLogin(false);
    }, 2000);
  };

  useEffect( ()=>{
      document.body.style.overflow ='hidden'
       
       return () => {
        document.body.style.overflow = 'auto'
       }
  },[])

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[1000]">

      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
        {/* Close Button */}
        
          <img onClick={e => setShowRecruiterLogin(false)} 
          className='absolute top-5 right-5 cursor-pointer'
          src={assets.cross_icon} alt="" />
        

        <h1 className="text-2xl font-bold text-center mb-1">
          Recruiter {state}
        </h1>
        <p className="text-gray-500 text-center mb-4 text-sm">
          Welcome back! Please sign in to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {state === 'Signup' && (
            <div className="flex items-center gap-2 border rounded px-3 py-2">
              <img src={assets.person_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Company Name"
                className="flex-1 outline-none"
                required
              />
            </div>
          )}

          <div className="flex items-center gap-2 border rounded px-3 py-2">
            <img src={assets.email_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="flex-1 outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-2 border rounded px-3 py-2">
            <img src={assets.lock_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="flex-1 outline-none"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <button
              type="button"
              onClick={() => alert('Reset password flow here')}
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {state === 'Login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        {/* Success Message */}
        {isSubmitted && (
          <p className="text-green-600 text-center mt-3 text-sm">
             Form submitted successfully!
          </p>
        )}

        {/* Toggle Login/Signup */}
        <p className="text-center text-sm text-gray-600 mt-4">
          {state === 'Login' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => setState(state === 'Login' ? 'Signup' : 'Login')}
            className="text-blue-600 cursor-pointer font-medium"
          >
            {state === 'Login' ? 'Sign up' : 'Login'}
          </span>
        </p>
      </div>
       
    </div>
  );
};

export default RecruiterLogin;
