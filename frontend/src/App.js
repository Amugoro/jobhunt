import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EmployerDashboard from './components/EmployerDashboard';
import RecruiterDashboard from './components/RecruiterDashboard';
import JobseekerDashboard from './components/JobseekerDashboard';
import Navbar from './components/Navbar'; // Import Navbar component
import { AuthContextProvider, AuthContext } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './styles/App.css';

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
        <Navbar /> {/* Navbar will be displayed on all pages */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Protected Routes */}
          <Route path="/employer-dashboard" element={<ProtectedRoute element={EmployerDashboard} />} />
          <Route path="/recruiter-dashboard" element={<ProtectedRoute element={RecruiterDashboard} />} />
          <Route path="/jobseeker-dashboard" element={<ProtectedRoute element={JobseekerDashboard} />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
