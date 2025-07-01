import React, { useState, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../pages/context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RecruiterLogin = () => {
  const {
    setShowRecruiterLogin,
    backendUrl,
    setCompanyData,
    setCompanyToken,
  } = useContext(AppContext);

  const [state, setState] = useState('Login'); // or 'Signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null); // ✅ file input state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      const endpoint =
        state === 'Signup'
          ? `${backendUrl}/api/company/register`
          : `${backendUrl}/api/company/login`;

      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      if (state === 'Signup') {
        formData.append('name', name);
        if (!image) {
          toast.error('Please select an image');
          setIsSubmitted(false);
          return;
        }
        formData.append('image', image); // ✅ use real uploaded file
      }

      const { data } = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("✅ Login/Signup Response:", data);

      if (data.success) {
        setCompanyData(data.company);
        setCompanyToken(data.token);
        toast.success(state === 'Login' ? 'Login Successful' : 'Account Created');
        setShowRecruiterLogin(false);
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('❌ Axios Error:', err.message);
      toast.error('Something went wrong!');
    } finally {
      setIsSubmitted(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-[1000]">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer"
          src={assets.cross_icon}
          alt="close"
        />

        <h1 className="text-2xl font-bold text-center mb-1">
          Recruiter {state}
        </h1>
        <p className="text-gray-500 text-center mb-4 text-sm">
          Welcome back! Please sign in to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {state === 'Signup' && (
            <>
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

              <div className="flex items-center gap-2 border rounded px-3 py-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="flex-1 text-sm"
                  required
                />
              </div>
            </>
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

        {isSubmitted && (
          <p className="text-green-600 text-center mt-3 text-sm">
            Submitting...
          </p>
        )}

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
