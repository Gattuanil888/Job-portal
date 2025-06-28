import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Joblisting from "../components/Joblisting";
import Appdownloader from "../components/Appdownloader";
import Footer from "../components/Footer";
import RecruiterLogin from "../components/RecruiterLogin";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
const Home =() =>{
    const {showRecruiterLogin} =useContext(AppContext);
    return(
        
        <div>
            <Navbar/>
            <Hero/>
            <Joblisting/>
            <Appdownloader/>
            <Footer/>
            {showRecruiterLogin && <RecruiterLogin />}
        </div>
       
    )
}
export default Home;
