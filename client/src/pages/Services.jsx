import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';
import ProtectedScheduleButton from '../components/ProtectedScheduleButton.jsx';
import { ChevronDown, ChevronRight, MapPin } from 'lucide-react';

function Services() {
  const [services, setServices] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Update the page title
    document.title = 'Our Services | Elevat Rehabilitation Center';
    
    // Fetch services
    const fetchServices = async () => {
      try {
        const response = await api.get('/services');
        setServices(response.data.data || []);  // safe fallback
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
        
        // Fallback data for development
        setServices([
          {
            id: 1,
            title: 'Depression Therapy',
            shortDescription: 'Professional support for overcoming depression and finding joy in life again.',
            description: 'Our depression therapy program offers a supportive environment where you can explore the underlying causes of your depression and develop strategies to manage symptoms. Through evidence-based techniques such as cognitive-behavioral therapy (CBT), we help you identify negative thought patterns and replace them with healthier perspectives. Our compassionate therapists work with you to develop coping skills, improve your mood, and create a sustainable plan for long-term mental wellness.',
            image: 'https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            benefits: [
              'Relief from persistent sadness and low mood',
              'Improved energy levels and motivation',
              'Better sleep and appetite regulation',
              'Enhanced ability to enjoy activities',
              'Reduced negative thinking patterns'
            ]
          },
          {
            id: 2,
            title: 'Addiction Recovery',
            shortDescription: 'Comprehensive programs to overcome addiction and build sustainable recovery.',
            description: 'Our addiction recovery services provide structured support to help you break free from substance dependence and build a foundation for lasting sobriety. We utilize a holistic approach that addresses the physical, psychological, and social aspects of addiction. Our certified addiction specialists help you understand triggers, develop coping mechanisms, and create a personalized recovery plan. We offer both individual and group therapy sessions, along with family support resources to heal relationships affected by addiction.',
            image: '/Addiction.jpeg',
            benefits: [
              'Personalized recovery plan',
              'Safe environment for withdrawal management',
              'Development of healthy coping mechanisms',
              'Relapse prevention strategies',
              'Support network building'
            ]
          },
          {
            id: 3,
            title: 'Anxiety Management',
            shortDescription: 'Learn effective strategies to manage anxiety and reduce stress in daily life.',
            description: "Our anxiety management program helps you understand the root causes of your anxiety and develop practical tools to manage symptoms. Through a combination of cognitive-behavioral techniques, mindfulness practices, and exposure therapy when appropriate, we help you regain control over worry and fear. Our therapists teach you how to recognize anxiety triggers, implement relaxation techniques, and gradually face anxiety-provoking situations with confidence. You'll learn to break the cycle of avoidance and develop healthier responses to stress.",
            image: '/Anxiety.jpeg',
            benefits: [
              'Reduced frequency and intensity of panic attacks',
              'Improved ability to manage everyday stressors',
              'Better sleep quality',
              'Decreased physical symptoms of anxiety',
              'Enhanced social confidence'
            ]
          },
          {
            id: 4,
            title: 'Relationship $ Marriage Counselling',
            shortDescription: 'Strengthen connections and improve communication in your relationships.',
            description: "Our relationship counseling services help couples and families improve communication, resolve conflicts, and deepen their connection. Whether you're facing challenges in your marriage, dealing with parent-child conflicts, or navigating life transitions as a family, our therapists provide a safe space to express concerns and work toward solutions. We teach effective communication techniques, help identify unhealthy patterns, and guide you in developing new ways of relating that foster understanding and intimacy.",
            image: '/Relationship.jpeg',
            benefits: [
              'Improved communication skills',
              'Effective conflict resolution',
              'Deepened emotional intimacy',
              'Clearer boundaries and expectations',
              'Stronger family bonds'
            ]
          },
          {
            id: 5,
            title: 'Trauma Recovery',
            shortDescription: 'Heal from past trauma and reclaim your sense of safety and wellbeing.',
            description: 'Our trauma recovery program provides specialized support for those who have experienced traumatic events. Using evidence-based approaches such as EMDR (Eye Movement Desensitization and Reprocessing), trauma-focused CBT, and somatic experiencing, we help you process difficult memories in a safe environment. Our trauma specialists understand the complex ways trauma affects the mind and body, and work at your pace to help you reduce symptoms, develop coping strategies, and restore a sense of safety and control in your life.',
            image: 'https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            benefits: [
              'Reduced nightmares and flashbacks',
              'Decreased emotional reactivity',
              'Improved ability to regulate emotions',
              'Enhanced sense of safety and control',
              'Integration of traumatic experiences'
            ]
          },
          {
            id: 6,
            title: 'Stress Management',
            shortDescription: 'Develop effective tools to cope with stress and prevent burnout.',
            description: "Our stress management program helps you identify sources of stress in your life and develop practical strategies to reduce their impact. Through a combination of mindfulness techniques, relaxation training, and lifestyle adjustments, we help you create a more balanced approach to life's challenges. You'll learn to recognize early signs of stress, implement self-care practices, and make choices that align with your values and priorities. Our approach emphasizes preventative measures to help you avoid burnout and maintain optimal wellbeing.",
            image: 'https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            benefits: [
              'Reduced physical symptoms of stress',
              'Improved work-life balance',
              'Enhanced resilience to daily challenges',
              'Better quality sleep',
              'Increased energy and productivity'
            ]
          },
          {
            id: 7,
            title: 'Family Therapy',
            shortDescription: 'Build stronger family bonds and resolve conflicts with guided therapeutic support.',
            description: 'Our family therapy sessions are designed to enhance communication, resolve conflicts, and create a healthier family dynamic. We work with all members of the family system to understand individual roles, address relational patterns, and establish a collaborative environment. Whether dealing with parenting struggles, blended family challenges, or intergenerational trauma, our therapists guide families toward healing and understanding.',
            image: '/Family.jpeg',
            benefits: [
              'Improved family communication',
              'Conflict resolution skills',
              'Better emotional understanding',
              'Strengthened family bonds',
              'Support through transitions (divorce, relocation, loss)'
            ],
          },
          {
            id: 8,
            title: 'Child/Adolescence Therapy',
            shortDescription: 'Therapeutic support tailored to children and teens for emotional and behavioral challenges.',
            description: 'Our child and adolescent therapy services provide a safe and supportive space for young people to explore their emotions and navigate life’s challenges. We use age-appropriate approaches including play therapy, CBT, and family involvement to address concerns such as anxiety, school difficulties, trauma, peer issues, and mood disorders. Our goal is to empower youth with tools to cope, communicate, and thrive during critical developmental stages.',
            image: '/Child.jpeg',
            benefits: [
              'Increased emotional awareness and expression',
              'Improved behavior at home and school',
              'Coping tools for stress and anxiety',
              'Stronger self-esteem and confidence',
              'Healthy family and peer relationships'
            ],
          }
        ]);
      }
    };
    
    fetchServices();
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/3760275/pexels-photo-3760275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Our services" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Our Rehabilitation Services
            </h1>
            <p className="paragraph text-blue-100 mb-8 text-lg md:text-xl">
              We offer a comprehensive range of therapeutic services designed to support your journey to recovery and overall well-being through in-person sessions with Psychologist Joan.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services List Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {loading ? (
                Array(3).fill(0).map((_, index) => (
                  <div key={index} className="animate-pulse bg-white rounded-lg shadow-md p-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))
              ) : (
                services.map((service, index) => (
                  <div 
                    key={service.id} 
                    id={service.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div 
                      className="p-6 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleAccordion(index)}
                    >
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <div className="text-blue-600">
                        {activeAccordion === index ? (
                          <ChevronDown size={24} />
                        ) : (
                          <ChevronRight size={24} />
                        )}
                      </div>
                    </div>
                    
                    {activeAccordion === index && (
                      <div className="px-6 pb-6">
                        <div className="grid md:grid-cols-5 gap-6">
                          <div className="md:col-span-2">
                            <img 
                              src={service.image} 
                              alt={service.title} 
                              className="w-full h-64 object-cover rounded-lg shadow-md"
                            />
                          </div>
                          <div className="md:col-span-3">
                            <p className="text-gray-700 mb-4">{service.description}</p>
                            
                            <h4 className="font-bold text-lg mb-2">Benefits:</h4>
                            <ul className="list-disc pl-5 mb-6 space-y-1">
                              {service.benefits.map((benefit, i) => (
                                <li key={i} className="text-gray-700">{benefit}</li>
                              ))}
                            </ul>
                            
                            <ProtectedScheduleButton />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Approach Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-2 mb-4">Our Therapeutic Approach</h2>
            <p className="paragraph">
              At Elevat Rehabilitation Center, we believe in a holistic, client-centered approach to healing. Our methods are evidence-based and tailored to your unique needs through personalized in-person sessions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Personalized Care</h3>
              <p className="text-gray-700">
                We recognize that each individual's journey is unique. Our treatment plans are customized to address your specific challenges, goals, and preferences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">In-Person Connection</h3>
              <p className="text-gray-700">
                Face-to-face therapy sessions provide the personal connection and immediate feedback essential for effective treatment and lasting change.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Holistic Healing</h3>
              <p className="text-gray-700">
                We address the complete person—mind, body, and spirit. Our comprehensive approach considers all aspects of your wellbeing for sustainable recovery.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="heading-2 mb-4">Ready to Start Your Journey?</h2>
              <p className="text-blue-100 mb-6">
                Taking the first step toward recovery and healing is a sign of strength. Schedule an in-person meeting with Psychologist Joan at our Elevat Rehabilitation Center.
              </p>
              <div className="flex flex-wrap gap-4">
                <ProtectedScheduleButton className="btn bg-white text-blue-700 hover:bg-blue-50" />
                <Link to="/contact" className="btn border-white text-white hover:bg-blue-600">
                  Contact Us
                </Link>
              </div>
            </div>
            
            <div className="bg-blue-800 rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-bold mb-4">Visit Our Office</h3>
              <div className="space-y-3 text-blue-100">
                <div className="flex items-start">
                  <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Elevat Rehabilitation Center Office</p>
                    <p>2344</p>
                    <p>Kiambu Town</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm">
                    <strong>Office Hours:</strong><br />
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
