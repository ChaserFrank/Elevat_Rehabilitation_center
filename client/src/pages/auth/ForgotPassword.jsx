import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

// Validation schema
const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required')
}).required();

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      //  This is the API call to the backend
      await axios.post('/api/auth/forgot-password', data);
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      
      /* // For development, simulate success (remove in production)
      setIsSuccess(true);
      toast.success('Development mode: Reset link sent!'); */
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-6">
              <h1 className="heading-3">Forgot Password</h1>
              <p className="text-gray-600">Enter your email to receive a password reset link</p>
            </div>
            
            {isSuccess ? (
              <div className="text-center">
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-4">
                  We've sent a password reset link to your email. Please check your inbox and follow the instructions.
                </p>
                <p className="text-gray-600 text-sm">
                  Didn't receive an email? Check your spam folder or{' '}
                  <button 
                    onClick={() => setIsSuccess(false)} 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    try again
                  </button>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : 'Send Reset Link'}
                </button>
                
                <div className="text-center">
                  <Link to="/login" className="text-sm text-blue-600 hover:text-blue-800">
                    Back to login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;