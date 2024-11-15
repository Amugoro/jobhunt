import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployerDashboard from './components/EmployerDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import JobseekerDashboard from './components/JobseekerDashboard';
import Navbar from './components/Navbar'; 
import { AuthContextProvider, AuthContext } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Services from './pages/Services';
import AboutUs from './pages/Aboutus';
import Footer from './pages/Footer';
import OurTeam from './pages/OurTeam';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactUs from './pages/ContactUs';
import JobSearch from './pages/JobSearch';

// Protected Route component
function ProtectedRoute({ element: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  // Check if user is logged in; if not, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar /> 
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/job-search" element={<JobSearch />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          


          {/* Protected Routes */}
          <Route path="/employer-dashboard" element={<ProtectedRoute element={EmployerDashboard} />} />
          <Route path="/recruiter-dashboard" element={<ProtectedRoute element={RecruiterDashboard} />} />
          <Route path="/jobseeker-dashboard" element={<ProtectedRoute element={JobseekerDashboard} />} />
        </Routes>
        <Footer/>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
