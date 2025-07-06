import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);
  
  useEffect(() => {
    // Update the page title
    document.title = 'Blog | Elevat Rehabilitation Center';
    
    // Fetch blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('/api/blogs');
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
        
        // Fallback data for development
        setBlogs([
          {
            id: 1,
            title: '5 Proven Strategies to Manage Anxiety in Daily Life',
            content: 'Anxiety can be overwhelming, but there are effective strategies to manage it...',
            snippet: 'Discover practical techniques to help reduce anxiety symptoms and improve your quality of life.',
            author: 'Psychologist Joan Muturi',
            category: 'Anxiety',
            createdAt: '2025-05-15T10:30:00Z',
            readTime: '5 min read',
            imageUrl: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 2,
            title: 'Building a Strong Support System During Recovery',
            content: 'A robust support system is crucial for successful recovery from addiction...',
            snippet: 'Learn how to create and maintain a network of support that will help you throughout your recovery journey.',
            author: 'Psychologist Joan Muturi',
            category: 'Addiction',
            createdAt: '2025-04-28T14:15:00Z',
            readTime: '7 min read',
            imageUrl: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 3,
            title: 'The Power of Mindfulness in Mental Health Treatment',
            content: 'Mindfulness practices have emerged as powerful tools in treating mental health conditions...',
            snippet: 'Explore how mindfulness practices can significantly improve symptoms of depression, anxiety, and stress.',
            author: 'Psychologist Joan Muturi',
            category: 'Mindfulness',
            createdAt: '2025-04-12T09:45:00Z',
            readTime: '6 min read',
            imageUrl: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 4,
            title: 'Understanding the Link Between Physical and Mental Health',
            content: 'The connection between our physical and mental wellbeing is stronger than many realize...',
            snippet: 'Discover how exercise, nutrition, and sleep directly impact your mental health and overall well-being.',
            author: 'Psychologist Joan Muturi',
            category: 'Wellness',
            createdAt: '2025-05-24T11:20:00Z',
            readTime: '8 min read',
            imageUrl: 'https://i.pinimg.com/736x/46/d2/0b/46d20ba1c1da10ab437eab58ac063340.jpg'
          },
          {
            id: 5,
            title: 'Recognizing the Warning Signs of Depression',
            content: 'Depression often goes unrecognized until symptoms become severe...',
            snippet: 'Learn to identify early warning signs of depression and when to seek professional help.',
            author: 'Psychologist Joan Muturi',
            category: 'Depression',
            createdAt: '2025-05-10T16:30:00Z',
            readTime: '5 min read',
            imageUrl: 'https://i.pinimg.com/736x/f2/a3/39/f2a339194d4a9b4de136a981f8351458.jpg'
          },
          {
            id: 6,
            title: 'Navigating Family Relationships in Recovery',
            content: 'Family dynamics play a crucial role in the recovery process...',
            snippet: 'Understand how to rebuild and strengthen family relationships that may have been strained during addiction.',
            author: 'Psychologist Joan Muturi',
            category: 'Relationships',
            createdAt: '2025-05-28T13:45:00Z',
            readTime: '7 min read',
            imageUrl: 'https://i.pinimg.com/736x/57/d2/24/57d224304a91358a744fa0dca31ae072.jpg'
          },
          {
            id: 7,
            title: 'The Importance of Self-Care in Preventing Burnout',
            content: 'Burnout has become increasingly common in our fast-paced society...',
            snippet: 'Discover essential self-care practices that can help prevent burnout and maintain your mental health.',
            author: 'Psychologist Joan Muturi',
            category: 'Self-Care',
            createdAt: '2025-05-15T10:15:00Z',
            readTime: '6 min read',
            imageUrl: 'https://i.pinimg.com/736x/74/93/7a/74937a6266355b6dae6888ec7c4a5690.jpg'
          },
          {
            id: 8,
            title: 'Overcoming Social Anxiety: A Step-by-Step Guide',
            content: "Social anxiety can significantly limit one's quality of life and opportunities...",
            snippet: 'Follow this practical guide to gradually reduce social anxiety and build confidence in social situations.',
            author: 'Psychologist Joan Muturi',
            category: 'Anxiety',
            createdAt: '2025-05-30T09:30:00Z',
            readTime: '8 min read',
            imageUrl: 'https://i.pinimg.com/736x/a9/0f/ba/a90fba4eef258ca5cdec3abdb479fe91.jpg'
          }
        ]) ;
      }
    };
    
    fetchBlogs();
  }, []);
  
  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.snippet.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-blue-700 text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6">
              Elevat Rehabilitation Center Blog
            </h1>
            <p className="paragraph text-blue-100 mb-8 text-lg md:text-xl">
              Insights, advice, and information to support your mental health and recovery journey.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  placeholder="Search articles by title, category, or keyword..."
                  className="w-full px-5 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Listing */}
      <section className="py-16">
        <div className="container">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-3 w-1/4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2 w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded mb-6 w-4/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="heading-3 mb-4">No articles found</h2>
              <p className="paragraph mb-6">
                We couldn't find any articles matching your search term. Try a different keyword or browse all articles.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn btn-primary"
              >
                View All Articles
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentBlogs.map(blog => (
                  <div key={blog.id} className="card overflow-hidden group transition-all duration-300 hover:shadow-lg">
                    <div className="overflow-hidden h-48">
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-xs text-gray-500 ml-2 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {blog.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {blog.snippet}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <User size={14} className="mr-1" />
                          <span>{blog.author}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>{formatDate(blog.createdAt)}</span>
                        </div>
                      </div>
                      <Link 
                        to={`/blogs/${blog.id}`} 
                        className="mt-4 inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                      >
                        Read Article <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {filteredBlogs.length > blogsPerPage && (
                <div className="flex justify-center mt-12">
                  <nav className="inline-flex rounded-md shadow">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded-l-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      Previous
                    </button>
                    {Array.from({ length: Math.ceil(filteredBlogs.length / blogsPerPage) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 border-t border-b ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)}
                      className={`px-3 py-1 rounded-r-md border ${currentPage === Math.ceil(filteredBlogs.length / blogsPerPage) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="heading-3 mb-4">Subscribe to Our Newsletter</h2>
                <p className="paragraph mb-6">
                  Stay up-to-date with the latest articles, tips, and resources to support your mental health journey.
                </p>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="input"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-gray-500 mt-4">
                  By subscribing, you agree to our privacy policy. We promise not to spam you and you can unsubscribe at any time.
                </p>
              </div>
              <div className="md:w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
                  <p className="text-blue-100">
                    Get weekly insights and inspiration delivered straight to your inbox.
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

export default Blogs;