{/* Keeping all the imports and component structure, just fixing the string issue */}
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ChevronDown, ChevronUp, Search, HelpCircle, Send } from 'lucide-react';

// Validation schema
const questionSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  question: yup.string().required('Question is required').min(10, 'Question must be at least 10 characters')
}).required();

function HelpCenter() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(questionSchema)
  });
  
  useEffect(() => {
    // Update the page title
    document.title = 'Help Center | Elevat Rehabilitation Center';
    
    // Fetch FAQs
    const fetchFAQs = async () => {
      try {
        const response = await axios.get('/api/faqs');
        setFaqs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
        setLoading(false);
        
         // Fallback data for development
        setFaqs([
          {
            id: 1,
            question: 'What types of therapy do you offer?',
            answer: "We offer a wide range of therapeutic services including individual therapy, group therapy, family therapy, and couples counseling. Psychologist Joan is trained in various approaches such as Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), Mindfulness-Based Cognitive Therapy (MBCT), and more. During your initial consultation, we'll determine which approach is most suitable for your specific needs.",
            category: 'Services'
          },
          {
            id: 2,
            question: 'How do I know if I need therapy?',
            answer: "If you're experiencing persistent feelings of sadness, anxiety, or emotional distress that interfere with your daily life, relationships, or work, you might benefit from therapy. Other signs include difficulty coping with life transitions, experiencing trauma or grief, struggling with addiction, or feeling stuck in unhelpful patterns. Remember, seeking help is a sign of strength, not weakness. Many people find therapy valuable for personal growth even without a specific mental health concern.",
            category: 'General'
          },
          {
            id: 3,
            question: 'How many sessions do I need?',
            answer: 'The number of sessions is determined by your condition, progress, and the treatment plan recommended by your psychologist. Some clients benefit from a few sessions, while others may require ongoing support.',
            category: 'Sessions'
          },
          {
            id: 4,
            question: 'Is therapy confidential?',
            answer: 'Yes, confidentiality is a fundamental aspect of our therapeutic relationship. Information shared during therapy sessions is kept private and confidential, with a few legal exceptions: if there is risk of harm to yourself or others, suspicion of child or elder abuse, or if required by court order. These limitations to confidentiality will be explained in detail during your first session. We take privacy very seriously and comply with all HIPAA regulations to protect your personal information.',
            category: 'Privacy'
          },
          {
            id: 5,
            question: 'Will anyone else know I am attending therapy?',
            answer: "No. Your sessions are strictly confidential. We do not disclose attendance to any third parties unless you provide explicit written consent or if required by law.",
            category: 'Privacy'
          },
          {
            id: 6,
            question: 'Can I choose the date and time of my appointment?',
            answer: 'Yes. You can choose from the available time slots that suit your schedule. Our calendar is updated in real-time based on Joan’s availability.',
            category: 'Appointments'
          },
          {
            id: 7,
            question: "Are your services tailored to individual needs?",
            answer: "Absolutely. Each client undergoes a thorough assessment during their first session to identify their specific needs. Based on this evaluation, we create a personalized treatment plan that may include one-on-one therapy, group sessions, or specialized interventions.",
            category: 'Services'
          },
          {
            id: 8,
            question: 'How do I schedule an appointment?',
            answer: "Login to your account on our website, browse through our services, choose your preferred session, select a date and time, and confirm the appointment. You will receive a confirmation email shortly after.",
            category: 'Appointments'
          },
          {
            id: 9,
            question: 'What\'s the difference between a psychiatrist and a therapist?',
            answer: 'Psychiatrists are medical doctors who specialize in mental health and can prescribe medication. Their focus is often on the biological aspects of mental health and medication management. Therapists (which may include psychologists, licensed counselors, social workers) focus on providing talk therapy and behavioral interventions to address emotional and psychological issues. At RehabCare, we offer both services and often recommend a collaborative approach when appropriate, where clients see both a therapist for regular sessions and a psychiatrist for medication evaluation and management.',
            category: 'General'
          },
          {
            id: 10,
            question: 'Is there a difference between counselling and therapy services?',
            answer: 'Yes. Counseling usually addresses immediate issues and is generally short-term, such as coping with stress or resolving conflicts. Therapy, on the other hand, delves deeper into chronic emotional and psychological problems and may take place over a longer duration. Our professionals will recommend the most suitable approach after assessment.',
            category: 'Services'
          },
          {
            id: 11,
            question: 'How do I know if I\'m making progress in therapy?',
            answer: 'Progress in therapy can manifest in various ways, including improved mood, better relationships, reduced symptoms, enhanced coping skills, and greater self-awareness. You and your therapist will establish clear goals at the beginning of treatment and regularly review your progress. Some therapists use assessments or rating scales to track changes objectively. Remember that progress isn\'t always linear—there may be setbacks along the way, which are a normal part of the healing process. Open communication with your therapist about your perception of progress is essential.',
            category: 'Sessions'
          },
          {
            id: 12,
            question: 'What should I expect during my first session?',
            answer: 'Your first session will involve an intake assessment where your psychologist will get to know your concerns, background, and objectives. It’s also an opportunity for you to ask questions and become comfortable with the process.',
            category: 'Sessions'
          }
        ]); 
      }
    };
    
    fetchFAQs();
  }, []);
  
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group FAQs by category
  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});
  
  // Submit question form
  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // In a real app, this is an API call to your backend
      await axios.post('/api/faqs/submit', data);
      
      toast.success('Your question has been submitted successfully!');
      setShowSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting question:', error);
      
      /* // For development, simulate success (remove in production)
      toast.success('Development mode: Question submitted successfully!');
      setShowSuccess(true);
      reset(); */
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-purple-700 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              How Can We Help You?
            </h1>
            <p className="paragraph text-blue-100 mb-8 text-lg md:text-xl">
              Find answers to commonly asked questions or ask your own question.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for questions..."
                  className="w-full px-5 py-3 pl-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="space-y-4">
                {Array(5).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="mt-4 h-24 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <div className="mb-4">
                  <HelpCircle size={48} className="mx-auto text-gray-400" />
                </div>
                <h2 className="heading-3 mb-4">No questions found</h2>
                <p className="paragraph mb-6">
                  We couldn't find any questions matching your search term. Try a different keyword or browse all questions.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn btn-primary"
                >
                  View All Questions
                </button>
              </div>
            ) : (
              <div>
                {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
                  <div key={category} className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">{category}</h2>
                    <div className="space-y-4">
                      {categoryFAQs.map((faq, index) => (
                        <div 
                          key={faq.id} 
                          className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                          <button
                            className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                            onClick={() => toggleAccordion(faq.id)}
                          >
                            <h3 className="text-lg font-medium">{faq.question}</h3>
                            {activeIndex === faq.id ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </button>
                          {activeIndex === faq.id && (
                            <div className="px-6 pb-4">
                              <p className="text-gray-600">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Ask a Question Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-2 mb-4">Still Have Questions?</h2>
              <p className="paragraph">
                If you couldn't find the answer you were looking for, feel free to submit your question and we will get back to you.
              </p>
            </div>
            
            {showSuccess ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Question Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for your question. We will review it and get back to you as soon as possible. In the meantime, feel free to explore other resources on our website.
                </p>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="btn btn-primary"
                >
                  Ask Another Question
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
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
                        Your Email
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
                  <div>
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Question
                    </label>
                    <textarea
                      id="question"
                      {...register('question')}
                      rows={5}
                      className={`input ${errors.question ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Please type your question here..."
                    ></textarea>
                    {errors.question && (
                      <p className="mt-1 text-sm text-red-600">{errors.question.message}</p>
                    )}
                  </div>
                  <div className="flex items-center">
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
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send size={16} className="mr-2" />
                          Submit Question
                        </span>
                      )}
                    </button>
                    <p className="text-sm text-gray-500 ml-4">
                      We typically respond within 24-48 hours.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Contact Options */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Other Ways to Get Help</h2>
            <p className="paragraph max-w-2xl mx-auto">
              If you prefer to speak with someone directly, we offer multiple ways to reach support needed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Phone Support */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our 24/7 phone call.
              </p>
              <a href="tel:+254704376452" className="text-blue-600 font-medium text-lg hover:text-blue-800">
                +254 704 376 452
              </a>
              <p className="text-sm text-gray-500 mt-2">
                Available Mon-Fri, 9am-5pm EST
              </p>
            </div>
            
            {/* Email Support */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll respond promptly.
              </p>
              <a href="mailto:info@elevatrehabilitationcenter.org" className="text-blue-600 font-medium break-all hover:text-blue-800">
                info@elevatrehabilitationcenter.org
              </a>
              <p className="text-sm text-gray-500 mt-2">
                We typically respond within 24 hours
              </p>
            </div>
            
            {/* Live Chat */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Chat with a support agent in real-time.
              </p>
              <button className="btn btn-primary">
                Start Chat
              </button>
              <p className="text-sm text-gray-500 mt-2">
                Available Mon-Fri, 9am-7pm EST
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HelpCenter;