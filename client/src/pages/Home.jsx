import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import ProtectedScheduleButton from '../components/ProtectedScheduleButton.jsx';
import { ArrowRight, MessageSquare, Star, MapPin } from 'lucide-react';

function Home() {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update the page title
    document.title = 'Elevat Rehabilitation Center - Your Path to Recovery';
    
    // Fetch services and testimonials
    const fetchData = async () => {
      try {
        const [servicesRes, testimonialsRes] = await Promise.all([
          api.get('/services'),
          api.get('/testimonials')
        ]);
        
        setServices(servicesRes.data.slice(0, 3));
        setTestimonials(testimonialsRes.data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        
        // Fallback data for development
        setServices([
          {
            id: 1,
            title: 'Depression Therapy',
            description: 'Professional support for overcoming depression and finding joy in life again.',
            image: 'https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 2,
            title: 'Addiction Recovery',
            description: 'Comprehensive programs to overcome addiction and build sustainable recovery.',
            image: 'https://i.pinimg.com/736x/86/7e/94/867e945bc6eb6ab0bb759cfbadc5a8c9.jpg'
          },
          {
            id: 3,
            title: 'Anxiety Management',
            description: 'Learn effective strategies to manage anxiety and reduce stress in daily life.',
            image: '/Anxiety.jpeg'
          }
        ]);
        
        setTestimonials([
          {
            id: 1,
            name: 'Sarah Johnson',
            message: 'The therapy sessions at RehabCare completely transformed my approach to anxiety. I now have tools to manage my stress effectively.',
            rating: 5,
            date: '2025-05-15'
          },
          {
            id: 2,
            name: 'Michael Thompson',
            message: 'After struggling with addiction for years, the recovery program here gave me a new perspective and the support I needed.',
            rating: 5,
            date: '2025-06-03'
          },
          {
            id: 3,
            name: 'Emily Parker',
            message: "The depression counseling helped me rediscover purpose and joy. I'm grateful for the compassionate care I received.",
            rating: 4,
            date: '2025-06-12'
          }
        ]);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Recovery journey" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Your Journey to Healing Starts Here
            </h1>
            <p className="paragraph text-blue-100 mb-8 text-lg md:text-xl">
              We provide compassionate care and support for those struggling with mental health challenges, addiction, and personal growth obstacles. Schedule an in-person meeting with Psychologist Joan today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ProtectedScheduleButton size="large" />
              <Link to="/services" className="btn btn-outline border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-3">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Our Rehabilitation Services</h2>
            <p className="paragraph max-w-2xl mx-auto">
              We offer a range of specialized therapy and rehabilitation services designed to support your unique journey to recovery and well-being.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                  </div>
                </div>
              ))
            ) : (
              services.map(service => (
                <div key={service.id} className="card group transition-all duration-300 hover:shadow-lg">
                  <div className="overflow-hidden h-48">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <Link 
                      to={`/services#${service.id}`} 
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                    >
                      Learn More <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 mb-6">Why Choose Elevat Rehabilitation Center?</h2>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">Experienced Psychologist Joan</h3>
                    <p className="text-gray-600">
                      Our lead psychologist Joan has extensive experience in various rehabilitation specialties and provides personalized in-person care.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <MapPin size={24} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">In-Person Sessions</h3>
                    <p className="text-gray-600">
                      Face-to-face therapy sessions in our comfortable wellness center provide the personal connection essential for effective treatment.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">Convenient Scheduling</h3>
                    <p className="text-gray-600">
                      Easy online appointment booking with flexible time slots to accommodate your schedule. Receive a unique ticket for each session.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 3H9M9 13.5h.01M12 13.5h.01M15 13.5h.01M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold mb-2">Evidence-Based Methods</h3>
                    <p className="text-gray-600">
                      Our treatment approaches are grounded in the latest research and proven clinical methodologies.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <ProtectedScheduleButton />
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/Choose.jpeg" 
                alt="Encouraging quote" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white p-2 rounded-full mr-3">
                    <Star size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-bold">98% Client Satisfaction</p>
                    <p className="text-gray-600">Based on over 500 reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-2 mb-6">Ready to Start Your Recovery Journey?</h2>
            <p className="paragraph text-blue-100 mb-8 text-lg">
              Take the first step toward healing and personal growth. Schedule an in-person meeting with Psychologist Joan at our wellness center.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ProtectedScheduleButton 
                className="btn bg-white text-blue-600 hover:bg-blue-50" 
                size="large" 
              />
              <Link to="/contact" className="btn border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">What Our Clients Say</h2>
            <p className="paragraph max-w-2xl mx-auto">
              Read about the experiences of those who have begun their healing journey with RehabCare.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="card animate-pulse p-6">
                  <div className="h-4 bg-gray-300 rounded mb-3 w-1/4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-6 w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
              ))
            ) : (
              testimonials.slice(0, 3).map(testimonial => (
                <div key={testimonial.id} className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(testimonial.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.message}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/testimonials" className="btn btn-outline">
              <MessageSquare size={18} className="mr-2" />
              Read More Testimonials
            </Link>
          </div>
        </div>
      </section>
      
      {/* Blog Preview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Latest from Our Blog</h2>
            <p className="paragraph max-w-2xl mx-auto">
              Insights, advice, and information to support your mental health and recovery journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample blog posts - would be fetched from API in production */}
            <div className="card overflow-hidden group transition-all duration-300 hover:shadow-lg">
              <div className="overflow-hidden h-48">
                <img
                  src="https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Overcoming anxiety"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">May 15, 2024</p>
                <h3 className="text-xl font-bold mb-3">5 Proven Strategies to Manage Anxiety in Daily Life</h3>
                <p className="text-gray-600 mb-4">Discover practical techniques to help reduce anxiety symptoms and improve your quality of life...</p>
                <Link 
                  to="/blogs/1" 
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                >
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="card overflow-hidden group transition-all duration-300 hover:shadow-lg">
              <div className="overflow-hidden h-48">
                <img
                  src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Support systems"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">April 28, 2024</p>
                <h3 className="text-xl font-bold mb-3">Building a Strong Support System During Recovery</h3>
                <p className="text-gray-600 mb-4">Learn how to create and maintain a network of support that will help you throughout your recovery journey...</p>
                <Link 
                  to="/blogs/2" 
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                >
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="card overflow-hidden group transition-all duration-300 hover:shadow-lg">
              <div className="overflow-hidden h-48">
                <img
                  src="https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Mindfulness meditation"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">April 12, 2024</p>
                <h3 className="text-xl font-bold mb-3">The Power of Mindfulness in Mental Health Treatment</h3>
                <p className="text-gray-600 mb-4">Explore how mindfulness practices can significantly improve symptoms of depression, anxiety, and stress...</p>
                <Link 
                  to="/blogs/3" 
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                >
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/blogs" className="btn btn-outline">
              View All Blog Posts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
