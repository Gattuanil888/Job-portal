import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Applyjob from './pages/Applyjob';
import Application from './pages/Application';
import Recruiterlogin from './components/RecruiterLogin';
import { AppContext } from './pages/context/AppContext';
import Dashboard from './pages/Dashboard';
import AddJob from './pages/AddJob';
import Managejobs from './pages/Managejobs';
import Viewapplications from './pages/Viewapplications';
import 'quill/dist/quill.snow.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />

      {showRecruiterLogin && <Recruiterlogin />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<Applyjob />} />
        <Route path="/application" element={<Application />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route
            path="add-job"
            element={companyToken ? <AddJob /> : <Navigate to="/" />}
          />
          <Route
            path="manage-jobs"
            element={companyToken ? <Managejobs /> : <Navigate to="/" />}
          />
          <Route
            path="view-applications"
            element={companyToken ? <Viewapplications /> : <Navigate to="/" />}
          />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
