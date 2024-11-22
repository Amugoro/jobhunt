import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import TradepersonDashboard from "../src/components/TradepersonDashboard";
import Navbar from "./components/Navbar";
import { AuthContextProvider, AuthContext } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Services from "./pages/Services";
import AboutUs from "./pages/Aboutus";
import Footer from "./pages/Footer";
import OurTeam from "./pages/OurTeam";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import JobSearch from "./components/JobSearch";
import FreelancerDashboard from "./pages/FreelancerDashboard";
import ClientDashboard from "./components/ClientDashboard";
import DonationPage from "./pages/DonationPage";
import "./app.css";

// Protected Route component
function ProtectedRoute({ element: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const roleDashboardRoutes = {
    client: "/client-dashboard",
    freelancer: "/freelancer-dashboard",
    tradeperson: "/tradeperson-dashboard",
  };

  const currentPath = rest.path;

  if (currentPath === roleDashboardRoutes[user.role]) {
    return <Component />;
  }

  return <Navigate to={roleDashboardRoutes[user.role]} replace />;
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <div className="page-content">
        <Routes>
          
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            {/* Protected Routes */}
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route
              path="/freelancer-dashboard"
              element={<FreelancerDashboard />}
            />
            <Route
              path="/tradeperson-dashboard"
              element={<TradepersonDashboard />}
            />
            <Route path="/services" element={<Services />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/job-search" element={<JobSearch />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/donation-page" element={<DonationPage />} />

            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />

            {/* Protected Routes */}

           
          
        </Routes>
        </div>

        <Footer />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
