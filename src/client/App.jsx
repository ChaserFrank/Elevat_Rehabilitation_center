import { Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import api from './api/axios.js';

// Layouts
import MainLayout from './layouts/MainLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';

// Pages
import Home from './pages/Home.jsx';
import Services from './pages/Services.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import HelpCenter from './pages/HelpCenter.jsx';
import Contact from './pages/Contact.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import ScheduleAppointment from './pages/ScheduleAppointment.jsx';

// Auth Pages
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';

// Admin Pages
import Dashboard from './pages/admin/Dashboard.jsx';
import ManageBlogs from './pages/admin/ManageBlogs.jsx';
import ManageAppointments from './pages/admin/ManageAppointments.jsx';
import ManageSessions from './pages/admin/ManageSessions.jsx';
import ManageFAQs from './pages/admin/ManageFAQs.jsx';
import ManageTestimonials from './pages/admin/ManageTestimonials.jsx';

// Context
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/verify')
      .then(response => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogDetail />} />
          <Route path="help-center" element={<HelpCenter />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="schedule-appointment" element={<ScheduleAppointment />} />
          
          {/* Auth Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Admin Routes - Protected */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="appointments" element={<ManageAppointments />} />
          <Route path="sessions" element={<ManageSessions />} />
          <Route path="faqs" element={<ManageFAQs />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;