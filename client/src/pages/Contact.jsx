import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

// Validation schema
const contactSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters')
}).required();

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contactSchema)
  });
  
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // In a real app, this is the API call to backend
      await axios.post('/api/contact', data);
      
      toast.success('Your message has been sent successfully!');
      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error('Error sending message:', error);
      
      /* // For development, simulate success (remove in production)
      toast.success('Development mode: Message sent successfully!');
      setShowSuccess(true);
      reset(); */
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Contact us" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Contact Us
            </h1>
            <p className="paragraph text-blue-100 mb-8 text-lg md:text-xl">
              Have questions about services offered? Reach out to our team and we'll be happy to assist you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="heading-3 mb-6">Reach Us, Get Help</h2>
              <p className="paragraph mb-8">
                We're here to help! Whether you have questions about our services, need to schedule an appointment, or want to provide feedback, we'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <MapPin size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      2344<br />
                      Kiambu, Kiambu town<br />
                      Kenya
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <Phone size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold mb-1">Phone Numbers</h3>
                    <p className="text-gray-600 mb-1">
                      Main: <a href="tel:+254704376452" className="text-blue-600 hover:text-blue-800">+254 704 376 452</a>
                    </p>
                    <p className="text-gray-600">
                      Support: <a href="tel:+254782066785" className="text-blue-600 hover:text-blue-800">+254 782 066 785</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <Mail size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold mb-1">Email Addresses</h3>
                    <p className="text-gray-600 mb-1">
                      General Inquiries: <a href="mailto:info@elevatrehabilitationcenter.org" className="text-blue-600 hover:text-blue-800">info@elevatrehabilitationcenter.org</a>
                    </p>
                    <p className="text-gray-600">
                      Support: <a href="mailto:info@elevatrehabilitationcenter.org" className="text-blue-600 hover:text-blue-800">info@elevatrehabilitationcenter.org</a>
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <Clock size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold mb-1">Business Hours</h3>
                    <p className="text-gray-600 mb-1">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                    <p className="text-gray-600 mb-1">
                      Saturday: 9:00 AM - 2:00 PM
                    </p>
                    <p className="text-gray-600">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              {/* <div className="mt-8 rounded-lg overflow-hidden shadow-md h-80 bg-gray-200">
                <iframe 
                  title="RehabCare Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941774136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1661794047159!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div> */}
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-md p-8">
                {showSuccess ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                    <p className="text-gray-600 mb-8">
                      Thank you for reaching out to us. Our team will review your message and get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="btn btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="heading-3 mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            {...register('name')}
                            className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="Your Name"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address <span className="text-red-600">*</span>
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
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            {...register('phone')}
                            className={`input ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="1234567890"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Subject <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="subject"
                            type="text"
                            {...register('subject')}
                            className={`input ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
                            placeholder="How can we help you?"
                          />
                          {errors.subject && (
                            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message <span className="text-red-600">*</span>
                        </label>
                        <textarea
                          id="message"
                          rows={6}
                          {...register('message')}
                          className={`input ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                          placeholder="Please provide details about your inquiry..."
                        ></textarea>
                        {errors.message && (
                          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          Fields marked with <span className="text-red-600">*</span> are required
                        </p>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn btn-primary"
                        >
                          {submitting ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <Send size={16} className="mr-2" />
                              Send Message
                            </span>
                          )}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Frequently Asked Questions</h2>
            <p className="paragraph max-w-2xl mx-auto">
              Find quick answers to common questions about our services.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-2">What types of therapy do you offer?</h3>
              <p className="text-gray-600">
                We offer individual therapy, group therapy, family therapy, and specialized treatment programs for various mental health conditions and addiction recovery.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-2">Do you offer follow-up or aftercare support?</h3>
              <p className="text-gray-600">
               Yes. We believe in holistic and continuous care, so we provide follow-up sessions and aftercare planning to help clients stay on track with their recovery.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-2">What should I expect during my first session?</h3>
              <p className="text-gray-600">
                Your first session will involve an intake assessment where your psychologist will get to know your concerns, background, and objectives. It’s also an opportunity for you to ask questions and become comfortable with the process.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold mb-2">How do I schedule my first appointment?</h3>
              <p className="text-gray-600">
                Login to your account on our website, browse through our services, choose your preferred session, select a date and time, and confirm the appointment. You will receive a confirmation email shortly after.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a href="/help-center" className="text-blue-600 font-medium hover:text-blue-800">
              View all FAQs →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;