import { Outlet, Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../App.jsx';
import { Menu, X, LayoutDashboard, BookOpenText, Calendar, HelpCircle, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminLayout() {
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md md:hidden hover:bg-gray-200">
            <X size={20} />
          </button>
        </div>
        <nav className="px-2 py-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                <LayoutDashboard className="mr-3" size={20} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/appointments" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                <Calendar className="mr-3" size={20} />
                <span>Appointments</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/blogs" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                <BookOpenText className="mr-3" size={20} />
                <span>Blogs</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/sessions" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                <Calendar className="mr-3" size={20} />
                <span>Sessions</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/faqs" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                <HelpCircle className="mr-3" size={20} />
                <span>FAQs</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/testimonials" className="flex items-center p-2 rounded-md hover:bg-blue-50 text-gray-700 hover:text-blue-600">
                <MessageSquare className="mr-3" size={20} />
                <span>Testimonials</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="p-1 rounded-md md:hidden hover:bg-gray-200">
            <Menu size={20} />
          </button>
          <div className="flex items-center ml-auto space-x-2">
            <span className="text-sm font-medium">{user.name}</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;