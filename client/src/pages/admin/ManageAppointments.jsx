import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api/axios.js';
import { Search, Calendar, Clock, User, MapPin, CheckCircle, XCircle, AlertCircle, Eye, Edit } from 'lucide-react';
import { toast } from 'react-toastify';

function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const { register, handleSubmit, setValue, watch } = useForm();
  
  useEffect(() => {
    document.title = 'Manage Appointments | RehabCare Admin';
    fetchAppointments();
  }, []);
  
  useEffect(() => {
    filterAppointments();
  }, [appointments, searchTerm, statusFilter]);
  
  const fetchAppointments = async () => {
    try {
      const response = await api.get('/admin/appointments');
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
      
      /* // Fallback data for development
      const mockAppointments = [
        {
          id: 1,
          ticketNumber: 'REHAB-JOAN-20241215-0001',
          user: { name: 'Sarah Johnson', email: 'sarah@example.com' },
          service: 'Depression Therapy',
          scheduledFor: '2024-12-15T10:00:00Z',
          status: 'confirmed',
          notes: 'First time patient, anxiety about therapy',
          createdAt: '2024-12-10T09:30:00Z'
        },
        {
          id: 2,
          ticketNumber: 'REHAB-JOAN-20241215-0002',
          user: { name: 'Michael Thompson', email: 'michael@example.com' },
          service: 'Addiction Recovery',
          scheduledFor: '2024-12-15T14:30:00Z',
          status: 'confirmed',
          notes: 'Follow-up session, making good progress',
          createdAt: '2024-12-11T11:15:00Z'
        },
        {
          id: 3,
          ticketNumber: 'REHAB-JOAN-20241216-0003',
          user: { name: 'Emily Davis', email: 'emily@example.com' },
          service: 'Anxiety Management',
          scheduledFor: '2024-12-16T09:00:00Z',
          status: 'attended',
          notes: 'Panic attacks, needs coping strategies',
          createdAt: '2024-12-12T16:45:00Z'
        },
        {
          id: 4,
          ticketNumber: 'REHAB-JOAN-20241216-0004',
          user: { name: 'Robert Wilson', email: 'robert@example.com' },
          service: 'Relationship Counseling',
          scheduledFor: '2024-12-16T15:00:00Z',
          status: 'missed',
          notes: 'Couple therapy session',
          createdAt: '2024-12-13T08:20:00Z'
        },
        {
          id: 5,
          ticketNumber: 'REHAB-JOAN-20241217-0005',
          user: { name: 'Jennifer Smith', email: 'jennifer@example.com' },
          service: 'Trauma Recovery',
          scheduledFor: '2024-12-17T11:30:00Z',
          status: 'cancelled',
          notes: 'PTSD treatment, very sensitive case',
          createdAt: '2024-12-14T13:10:00Z'
        }
      ]; */
      
      setAppointments(mockAppointments);
    }
  };
  
  const filterAppointments = () => {
    let filtered = appointments;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(appointment => 
        appointment.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }
    
    setFilteredAppointments(filtered);
  };
  
  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      await api.patch(`/admin/appointments/${appointmentId}`, { status: newStatus });
      
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
      
      toast.success(`Appointment status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating appointment status:', error);
      
      /* // For development, simulate success
      setAppointments(prev => 
        prev.map(appointment => 
          appointment.id === appointmentId 
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );
      toast.success(`Development mode: Appointment status updated to ${newStatus}`);*/ 
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-blue-600" />;
      case 'attended':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'missed':
        return <XCircle size={16} className="text-red-600" />;
      case 'cancelled':
        return <AlertCircle size={16} className="text-gray-600" />;
      default:
        return <Clock size={16} className="text-yellow-600" />;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'attended':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Appointments</h1>
        <div className="text-sm text-gray-600">
          Total: {appointments.length} | Today: {appointments.filter(a => 
            new Date(a.scheduledFor).toDateString() === new Date().toDateString()
          ).length}
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by ticket, name, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
          >
            <option value="all">All Statuses</option>
            <option value="confirmed">Confirmed</option>
            <option value="attended">Attended</option>
            <option value="missed">Missed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Quick filters:</span>
            <button
              onClick={() => setStatusFilter('confirmed')}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded"
            >
              Today's Appointments
            </button>
          </div>
        </div>
      </div>
      
      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredAppointments.length === 0 ? (
          <div className="p-8 text-center">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No appointments have been scheduled yet.'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket & Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.ticketNumber}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <User size={14} className="mr-1" />
                          {appointment.user.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(appointment.scheduledFor)}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {formatTime(appointment.scheduledFor)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1 capitalize">{appointment.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {appointment.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'attended')}
                              className="text-green-600 hover:text-green-900"
                              title="Mark as Attended"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(appointment.id, 'missed')}
                              className="text-red-600 hover:text-red-900"
                              title="Mark as Missed"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Appointment Details Modal */}
      {showModal && selectedAppointment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Appointment Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ticket Number</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">{selectedAppointment.ticketNumber}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Patient</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAppointment.user.name}</p>
                  <p className="text-sm text-gray-500">{selectedAppointment.user.email}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedAppointment.service}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Scheduled For</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {formatDate(selectedAppointment.scheduledFor)} at {formatTime(selectedAppointment.scheduledFor)}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                    {getStatusIcon(selectedAppointment.status)}
                    <span className="ml-1 capitalize">{selectedAppointment.status}</span>
                  </span>
                </div>
                
                {selectedAppointment.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedAppointment.notes}</p>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Booked On</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedAppointment.createdAt)}</p>
                </div>
              </div>
              
              {selectedAppointment.status === 'confirmed' && (
                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, 'attended');
                      setShowModal(false);
                    }}
                    className="flex-1 btn btn-secondary text-sm"
                  >
                    Mark Attended
                  </button>
                  <button
                    onClick={() => {
                      updateAppointmentStatus(selectedAppointment.id, 'missed');
                      setShowModal(false);
                    }}
                    className="flex-1 btn bg-red-600 text-white hover:bg-red-700 text-sm"
                  >
                    Mark Missed
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageAppointments;