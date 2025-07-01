/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth, useUser } from '@clerk/clerk-react';


export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: ''
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(localStorage.getItem('companyToken'));
  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/jobs');
      if (data.success && data.jobs && data.jobs.length > 0) {
        setJobs(data.jobs);
      } else {
        setJobs([{
          _id: "dummy1",
          title: "Dummy Job Title",
          description: "This is a dummy job description",
          category: "Development",
          location: "Remote",
          salary: 50000,
          level: "Entry",
          date: Date.now(),
          visible: true,
          companyId: { name: "Dummy Company" }
        }]);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch jobs');
    }
  };

  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/company', {
        headers: {
          token: companyToken,
        },
      });

      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
    }
  };

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/users/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.user);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch user data');
    }
  };

  //function to fetch user aplications data

  const fetchUserApplications = async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get(backendUrl + '/api/users/applications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setUserApplications(data.applications);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message || 'Failed to fetch applications');
  }
};


  useEffect(() => {
    if (companyToken) {
      localStorage.setItem('companyToken', companyToken);
    } else {
      localStorage.removeItem('companyToken');
    }
  }, [companyToken]);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() =>  {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  useEffect(() => {
  if (user) {
    (async () => {
      await fetchUserData();
      await fetchUserApplications();
    })();
  }
}, [user]);


  const value = {
  searchFilter,
  setSearchFilter,
  isSearched,
  setIsSearched,
  jobs,
  setJobs,
  showRecruiterLogin,
  setShowRecruiterLogin,
  companyToken,
  setCompanyToken,
  companyData,
  setCompanyData,
  backendUrl,
  userData,
  setUserData,
  userApplications,
  setUserApplications,
  fetchUserData,
  fetchUserApplications,
};


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
