import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Applyjob from './pages/Applyjob'
import Application from './pages/Application'
import Recruiterlogin from './components/RecruiterLogin'
import { AppContext } from './pages/context/AppContext'
import Dashboard from './pages/Dashboard'
import AddJob from './pages/Addjob'
import Managejobs from './pages/Managejobs'
import Viewapplications from './pages/Viewapplications'
import 'quill/dist/quill.snow.css'


function App() {

   const {showRecruiterLogin} = useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin && <Recruiterlogin/> }
      
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/apply-job/:id" element={<Applyjob />} />
  <Route path="/application" element={<Application />} />

  {/* Nest routes under Dashboard */}
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="Add-job" element={<AddJob />} />
    <Route path="manage-jobs" element={<Managejobs />} />
    <Route path="view-applications" element={<Viewapplications />} />
  </Route>

  </Routes>

    </div>
  )
}

export default App
