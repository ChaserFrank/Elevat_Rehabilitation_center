import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../App.jsx';
import { Calendar, Clock, CreditCard, DollarSign, CheckCircle, ChevronRight } from 'lucide-react';

// Validation schema
const bookingSchema = yup.object({
  sessionId: yup.string().required('Please select a service'),
  date: yup.string().required('Please select a date'),
  time: yup.string().required('Please select a time'),
  notes: yup.string()
}).required();

function Booking() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(bookingSchema)
  });
  
  const selectedDate = watch('date');
  const selectedTime = watch('time');
  const sessionId = watch('sessionId');
  
  useEffect(() => {
    // Update the page title
    document.title = 'Book a Session | Elevat Rehabilitation Center';
    
    // Check if user is logged in
    if (!user) {
      toast.info('Please log in to book a session');
      navigate('/login', { state: { from: location } });
      return;
    }
    
    // Fetch services
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
        setLoading(false);
        
        // Check if a service was pre-selected from the URL
        const params = new URLSearchParams(location.search);
        const serviceId = params.get('service');
        if (serviceId) {
          setValue('sessionId', serviceId);
          const service = response.data.find(s => s.id.toString() === serviceId);
          if (service) {
            setSelectedService(service);
          }
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
        
        /* // Fallback data for development
        const fallbackServices = [
          {
            id: 1,
            title: 'Depression Therapy',
            description: 'Professional support for overcoming depression.',
            //price: 150
          },
          {
            id: 2,
            title: 'Addiction Recovery',
            description: 'Comprehensive programs for addiction treatment.',
            //price: 175
          },
          {
            id: 3,
            title: 'Anxiety Management',
            description: 'Learn strategies to manage anxiety and stress.',
            //price: 145
          },
          {
            id: 4,
            title: 'Relationship Counseling',
            description: 'Improve communication and connection in relationships.',
            //price: 165
          },
          {
            id: 5,
            title: 'Trauma Recovery',
            description: 'Heal from past trauma and build resilience.',
            //price: 180
          }
        ]; */
        
        setServices(fallbackServices);
        
        // Check if a service was pre-selected from the URL
        const params = new URLSearchParams(location.search);
        const serviceId = params.get('service');
        if (serviceId) {
          setValue('sessionId', serviceId);
          const service = fallbackServices.find(s => s.id.toString() === serviceId);
          if (service) {
            setSelectedService(service);
          }
        }
      }
    };
    
    fetchServices();
  }, [user, navigate, location, setValue]);
  
  useEffect(() => {
    // Generate available time slots when date is selected
    if (selectedDate) {
      // In a real app, this would be an API call to check available times
      /* // For now, we'll simulate available time slots
      const times = [
        '9:00 AM', '10:00 AM', '11:00 AM', 
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
      ]; */
      setAvailableTimes(times);
    }
  }, [selectedDate]);
  
  useEffect(() => {
    // Update selected service when sessionId changes
    if (sessionId && services.length > 0) {
      const service = services.find(s => s.id.toString() === sessionId.toString());
      if (service) {
        setSelectedService(service);
      }
    }
  }, [sessionId, services]);
  
  const handleServiceSelect = (service) => {
    setValue('sessionId', service.id.toString());
    setSelectedService(service);
  };
  
  const nextStep = () => {
    setBookingStep(bookingStep + 1);
    window.scrollTo(0, 0);
  };
  
  const previousStep = () => {
    setBookingStep(bookingStep - 1);
    window.scrollTo(0, 0);
  };
  
  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      // In a real app, this would be an API call to your backend
      await axios.post('/api/bookings', {
        ...data,
        userId: user.id,
        amount: selectedService.price
      });
      
      setBookingComplete(true);
      toast.success('Booking successful!');
    } catch (error) {
      console.error('Booking error:', error);
      
      /* // For development, simulate success (remove in production)
      setTimeout(() => {
        setBookingComplete(true);
        toast.success('Development mode: Booking successful!');
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
            <p className="mt-4 text-lg text-gray-600">Loading booking information...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (bookingComplete) {
    return (
      <div className="min-h-screen py-20 bg-gray-50">
        <div className="container">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="heading-2 mb-4">Booking Confirmed!</h1>
            <p className="paragraph mb-8">
              Thank you for booking your session with Elevat Rehabilitation Center. We've sent a confirmation email to your registered email address with all the details.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
              <h3 className="text-lg font-bold mb-4">Booking Details:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">{selectedService.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">{selectedDate} at {selectedTime}</p>
                </div>
                {/* <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">60 minutes</p>
                </div> */}
                {/* <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">${selectedService.price}</p>
                </div> */}
              </div>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/booking')}
                className="btn btn-outline"
              >
                Book Another Session
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
          {/* Booking Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div className={`flex-1 relative ${bookingStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${bookingStep >= 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 bg-white'}`}>
                  1
                </div>
                <p className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium">
                  Select Service
                </p>
              </div>
              <div className={`w-full h-1 mx-2 ${bookingStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`flex-1 relative ${bookingStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${bookingStep >= 2 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 bg-white'}`}>
                  2
                </div>
                <p className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium">
                  Choose Date & Time
                </p>
              </div>
              <div className={`w-full h-1 mx-2 ${bookingStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              {/* <div className={`flex-1 relative ${bookingStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${bookingStep >= 3 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 bg-white'}`}>
                  3
                </div>
                <p className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium">
                  Payment
                </p>
              </div> */}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Step 1: Select Service */}
            {bookingStep === 1 && (
              <div className="p-8">
                <h1 className="heading-3 mb-6">Select a Service</h1>
                <div className="space-y-4">
                  {services.map(service => (
                    <div 
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedService?.id === service.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{service.title}</h3>
                          <p className="text-gray-600">{service.description}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-blue-600 mr-4">${service.price}</span>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedService?.id === service.id ? 'bg-blue-600 text-white' : 'border border-gray-300'}`}>
                            {selectedService?.id === service.id && (
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.sessionId && (
                  <p className="mt-2 text-sm text-red-600">{errors.sessionId.message}</p>
                )}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={!selectedService}
                    className={`btn ${selectedService ? 'btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                  >
                    Continue <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Choose Date & Time */}
            {bookingStep === 2 && (
              <div className="p-8">
                <h1 className="heading-3 mb-6">Select Date & Time</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Date Selection */}
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
                  
                  {/* Time Selection */}
                  <div>
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <Clock size={20} className="mr-2 text-blue-600" />
                      Select a Time
                    </h3>
                    {selectedDate ? (
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
                      <p className="text-gray-500 italic">Please select a date first</p>
                    )}
                    {errors.time && (
                      <p className="mt-2 text-sm text-red-600">{errors.time.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Additional Notes */}
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Additional Notes (Optional)</h3>
                  <textarea
                    {...register('notes')}
                    placeholder="Any special requests or information you'd like us to know before your session"
                    className="input min-h-[100px]"
                  ></textarea>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={previousStep}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                 {/*  <button
                    onClick={nextStep}
                    disabled={!selectedDate || !selectedTime}
                    className={`btn ${selectedDate && selectedTime ? 'btn-primary' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                  >
                    Continue to Payment <ChevronRight size={16} className="ml-1" />
                  </button> */}
                </div>
              </div>
            )}
            
            {/* Step 3: Payment */}
            {bookingStep === 3 && (
              <div className="p-8">
                <h1 className="heading-3 mb-6">Review and Payment</h1>
                
                {/* Booking Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium">{selectedService.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">${selectedService.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{selectedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{selectedTime}</p>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <p className="font-bold">Total</p>
                      <p className="text-xl font-bold text-blue-600">${selectedService.price}</p>
                    </div>
                  </div>
                </div>
                
                {/* Payment Form */}
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <CreditCard size={20} className="mr-2 text-blue-600" />
                    Payment Method
                  </h3>
                  
                  {/* For development - simplified payment */}
                  <div className="border rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="flutterwave"
                        name="paymentMethod"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <label htmlFor="flutterwave" className="ml-2 block text-sm font-medium text-gray-700">
                        Pay with Flutterwave
                      </label>
                    </div>
                    <p className="text-gray-600 text-sm">
                      You will be redirected to Flutterwave's secure payment platform to complete your transaction.
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={previousStep}
                      className="btn btn-outline"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit(onSubmit)}
                      disabled={processing}
                      className="btn btn-primary"
                    >
                      {processing ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        {/* <span className="flex items-center">
                          <DollarSign size={16} className="mr-2" />
                          Complete Booking
                        </span> */}
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;