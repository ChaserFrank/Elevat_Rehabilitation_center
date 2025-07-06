import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { AuthContext } from '../App.jsx';
import api from '../api/axios.js';
import { Calendar, Clock, MapPin, User, CheckCircle, ChevronRight } from 'lucide-react';

// Validation schema
const appointmentSchema = yup.object({
  serviceId: yup.string().required('Please select a service'),
  date: yup.string().required('Please select a date'),
  time: yup.string().required('Please select a time'),
  notes: yup.string()
}).required();

function ScheduleAppointment() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [appointmentComplete, setAppointmentComplete] = useState(false);
  const [ticketInfo, setTicketInfo] = useState(null);
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(appointmentSchema)
  });
  
  const selectedDate = watch('date');
  const selectedTime = watch('time');
  const serviceId = watch('serviceId');
  
  useEffect(() => {
    document.title = 'Schedule Physical Meeting | Elevat Rehabilitation Center';
    
    if (!user) {
      toast.info('Please log in to schedule an appointment.');
      navigate('/login');
      return;
    }
    
    fetchServices();
  }, [user, navigate]);
  
  useEffect(() => {
    if (selectedDate && selectedService) {
      fetchAvailableTimes(selectedDate, selectedService.id);
    }
  }, [selectedDate, selectedService]);
  
  useEffect(() => {
    if (serviceId && services.length > 0) {
      const service = services.find(s => s.id.toString() === serviceId.toString());
      if (service) {
        setSelectedService(service);
      }
    }
  }, [serviceId, services]);
  
  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
      
      // Fallback data for development
      const fallbackServices = [
        {
          id: 1,
          title: 'Depression Therapy',
          description: 'Professional support for overcoming depression.',
        },
        {
          id: 2,
          title: 'Addiction Recovery',
          description: 'Comprehensive programs for addiction treatment.',
        },
        {
          id: 3,
          title: 'Anxiety Management',
          description: 'Learn strategies to manage anxiety and stress.',
        },
        {
          id: 4,
          title: 'Relationship $Marriage Counseling',
          description: 'Improve communication and connection in relationships.',
        },
        {
          id: 5,
          title: 'Trauma Recovery',
          description: 'Heal from past trauma and build resilience.',
        },
        {
          id: 6,
          title: 'Stress Management',
          description: 'Effective techniques and support to manage daily and chronic stress.',
        },
        {
          id: 7,
          title: 'Family Therapy',
          description: 'Reinforce family bonds and resolve conflicts through guided therapy sessions.',
        },
        {
          id: 8,
          title: 'Child/Adolescent Therapy',
          description: 'Specialized care for emotional and behavioral development in children and teens.',
        }
      ];
      
      setServices(fallbackServices);
    }
  };
  
  const fetchAvailableTimes = async (date, serviceId) => {
    try {
      const response = await api.get(`/appointments/available-times?date=${date}&serviceId=${serviceId}`);
      setAvailableTimes(response.data);
    } catch (error) {
      console.error('Error fetching available times:', error);
      
      // Fallback available times for development
      const times = [
        '9:00 AM', '10:30 AM', '12:00 PM', 
        '1:30 PM', '3:00 PM', '4:30 PM'
      ];
      setAvailableTimes(times);
    }
  };
  
  const handleServiceSelect = (service) => {
    setValue('serviceId', service.id.toString());
    setSelectedService(service);
  };
  
  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      const response = await api.post('/appointments', {
        ...data,
        userId: user.id,
        serviceTitle: selectedService.title
      });
      
      setTicketInfo(response.data.ticket);
      setAppointmentComplete(true);
      toast.success('Appointment scheduled successfully! Check your email for confirmation.');
    } catch (error) {
      console.error('Appointment scheduling error:', error);
      
      /* // For development, simulate success
      setTimeout(() => {
        const mockTicket = {
          ticketNumber: `Psychologist-Joan-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
          service: selectedService.title,
          date: selectedDate,
          time: selectedTime,
          location: '2344, Kiambu',
          psychologist: 'Psychologist Joan'
        };
        setTicketInfo(mockTicket);
        setAppointmentComplete(true);
        toast.success('Development mode! Appointment scheduled successfully!');
      }, 1500); */
    } finally {
      setProcessing(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading appointment information...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (appointmentComplete && ticketInfo) {
    return (
      <div className="min-h-screen py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="heading-2 mb-4">Appointment Confirmed!</h1>
            <p className="paragraph mb-8">
              Your physical meeting has been scheduled. We've sent a confirmation email with all the details and your ticket information.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left mb-8">
              <h3 className="text-lg font-bold mb-4 text-blue-800">Your Appointment Ticket</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Ticket Number:</span>
                  <span className="font-mono font-bold text-blue-600">{ticketInfo.ticketNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Service:</span>
                  <span className="font-medium">{ticketInfo.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Date & Time:</span>
                  <span className="font-medium">{ticketInfo.date} at {ticketInfo.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Psychologist:</span>
                  <span className="font-medium">{ticketInfo.psychologist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Location:</span>
                  <span className="font-medium">{ticketInfo.location}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> Please bring this ticket number to your appointment. You will receive an email reminder 24 hours before your scheduled meeting.
              </p>
            </div>
            
            <div className="space-x-4">
              <button
                onClick={() => {
                  setAppointmentComplete(false);
                  setTicketInfo(null);
                  setValue('serviceId', '');
                  setValue('date', '');
                  setValue('time', '');
                  setValue('notes', '');
                }}
                className="btn btn-outline"
              >
                Schedule Another Meeting
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn btn-primary"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-2 mb-4">Schedule Physical Meeting</h1>
            <p className="paragraph">
              Book an in-person appointment with Psychologist Joan at Elevat Rehabilitation center.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Service Selection */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <User size={20} className="mr-2 text-blue-600" />
                    Select a Service
                  </h3>
                  <div className="space-y-4">
                    {services.map(service => (
                      <div 
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedService?.id === service.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-bold">{service.title}</h4>
                            <p className="text-gray-600">{service.description}</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedService?.id === service.id ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}>
                            {selectedService?.id === service.id && (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {errors.serviceId && (
                    <p className="mt-2 text-sm text-red-600">{errors.serviceId.message}</p>
                  )}
                </div>
                
                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Calendar size={20} className="mr-2 text-blue-600" />
                      Select a Date
                    </h3>
                    <input
                      type="date"
                      {...register('date')}
                      min={new Date().toISOString().split('T')[0]}
                      className={`input ${errors.date ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.date && (
                      <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Clock size={20} className="mr-2 text-blue-600" />
                      Select a Time
                    </h3>
                    {selectedDate && selectedService ? (
                      <div className="grid grid-cols-2 gap-2">
                        {availableTimes.map((time) => (
                          <div
                            key={time}
                            onClick={() => setValue('time', time, { shouldValidate: true })}
                            className={`p-2 border rounded-md text-center cursor-pointer transition-all ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:border-blue-300'}`}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Please select a service and date first</p>
                    )}
                    {errors.time && (
                      <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Location Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <MapPin size={20} className="mr-2 text-blue-600" />
                    Meeting Location
                  </h3>
                  <div className="text-gray-700">
                    <p className="font-medium">Elevat Rehabilitation Center</p>
                    <p>2344</p>
                    <p>Kiambu town, Kiambu</p>
                    <p className="mt-2 text-sm text-gray-600">
                      Please arrive 10 minutes early for check-in. Bring a valid ID and your ticket number.
                    </p>
                  </div>
                </div>
                
                {/* Additional Notes */}
                <div>
                  <h3 className="text-lg font-bold mb-4">Additional Notes (Optional)</h3>
                  <textarea
                    {...register('notes')}
                    placeholder="Any special requests or information you'd like Psychologist Joan to know before your meeting"
                    className="input min-h-[100px]"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={processing || !selectedService || !selectedDate || !selectedTime}
                    className={`btn ${selectedService && selectedDate && selectedTime ? 'btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                  >
                    {processing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Scheduling...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        Confirm Appointment
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleAppointment;