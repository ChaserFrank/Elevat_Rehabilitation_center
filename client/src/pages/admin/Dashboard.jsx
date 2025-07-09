import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Calendar, BookOpenText, MessageSquare, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalBlogs: 0,
    recentBookings: [],
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Update the page title
    document.title = 'Admin Dashboard | RehabCare';
    
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        setStats(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
        
        /* // Fallback data for development
        setStats({
          totalUsers: 286,
          totalBookings: 124,
          totalRevenue: 18750,
          totalBlogs: 24,
          monthlyGrowth: {
            users: 12,
            bookings: 8,
            revenue: -3
          },
          recentBookings: [
            {
              id: 1,
              user: { name: 'Michael Johnson' },
              sessionType: 'Depression Therapy',
              scheduledFor: '2024-05-25T14:00:00Z',
              amount: 150,
              status: 'confirmed'
            },
            {
              id: 2,
              user: { name: 'Emma Davis' },
              sessionType: 'Anxiety Management',
              scheduledFor: '2024-05-24T10:30:00Z',
              amount: 145,
              status: 'confirmed'
            },
            {
              id: 3,
              user: { name: 'Robert Wilson' },
              sessionType: 'Addiction Recovery',
              scheduledFor: '2024-05-23T15:00:00Z',
              amount: 175,
              status: 'cancelled'
            },
            {
              id: 4,
              user: { name: 'Jennifer Smith' },
              sessionType: 'Relationship Counseling',
              scheduledFor: '2024-05-22T13:00:00Z',
              amount: 165,
              status: 'completed'
            },
            {
              id: 5,
              user: { name: 'Daniel Brown' },
              sessionType: 'Stress Management',
              scheduledFor: '2024-05-21T11:30:00Z',
              amount: 140,
              status: 'completed'
            }
          ],
          recentUsers: [
            {
              id: 1,
              name: 'Alice Johnson',
              email: 'alice@example.com',
              joinedAt: '2024-05-20T09:23:15Z'
            },
            {
              id: 2,
              name: 'Thomas Lee',
              email: 'thomas@example.com',
              joinedAt: '2024-05-19T14:45:30Z'
            },
            {
              id: 3,
              name: 'Sophia Martinez',
              email: 'sophia@example.com',
              joinedAt: '2024-05-18T16:12:00Z'
            },
            {
              id: 4,
              name: 'David Wilson',
              email: 'david@example.com',
              joinedAt: '2024-05-17T10:30:45Z'
            },
            {
              id: 5,
              name: 'Olivia Taylor',
              email: 'olivia@example.com',
              joinedAt: '2024-05-16T13:20:10Z'
            }
          ]
        });*/
      }
    };
    
    fetchDashboardData();
  }, []);
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Users</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              <div className={`flex items-center mt-2 text-sm ${stats.monthlyGrowth?.users > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.monthlyGrowth?.users > 0 ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                <span>{Math.abs(stats.monthlyGrowth?.users || 0)}% from last month</span>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Bookings</p>
              <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
              <div className={`flex items-center mt-2 text-sm ${stats.monthlyGrowth?.bookings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.monthlyGrowth?.bookings > 0 ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                <span>{Math.abs(stats.monthlyGrowth?.bookings || 0)}% from last month</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar size={20} className="text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
              <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
              <div className={`flex items-center mt-2 text-sm ${stats.monthlyGrowth?.revenue > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {stats.monthlyGrowth?.revenue > 0 ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                <span>{Math.abs(stats.monthlyGrowth?.revenue || 0)}% from last month</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Blogs</p>
              <h3 className="text-2xl font-bold">{stats.totalBlogs}</h3>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <Link to="/admin/blogs" className="text-blue-600 hover:text-blue-800">
                  Manage blogs →
                </Link>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <BookOpenText size={20} className="text-orange-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Monthly Bookings</h2>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <BarChart3 size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">Chart visualization will appear here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Revenue by Service</h2>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center">
            <BarChart3 size={48} className="text-gray-300" />
            <p className="ml-4 text-gray-500">Chart visualization will appear here</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Bookings</h2>
              <Link to="/admin/bookings" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y">
            {stats.recentBookings.map(booking => (
              <div key={booking.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{booking.user.name}</p>
                    <p className="text-sm text-gray-500">{booking.sessionType}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${booking.amount}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(booking.scheduledFor)} at {formatTime(booking.scheduledFor)}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : booking.status === 'cancelled' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                  <Link to={`/admin/bookings/${booking.id}`} className="text-sm text-blue-600 hover:text-blue-800">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">New Users</h2>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </a>
            </div>
          </div>
          <div className="divide-y">
            {stats.recentUsers.map(user => (
              <div key={user.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Joined on</p>
                    <p className="text-sm font-medium">{formatDate(user.joinedAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;