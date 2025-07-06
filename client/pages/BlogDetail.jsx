import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Clock, User, ChevronLeft, Share2, Heart, MessageCircle, Facebook, Twitter, Linkedin } from 'lucide-react';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  useEffect(() => {
    // Fetch blog post
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`/api/blogs/${id}`);
        setBlog(response.data);
        document.title = `${response.data.title} | Elevat Rehabilitation Center Blog`;
        
        // Fetch related blogs
        const relatedResponse = await axios.get(`/api/blogs/related/${id}?category=${response.data.category}`);
        setRelatedBlogs(relatedResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
        
         // Fallback data for development
        const sampleBlog = {
          id: 1,
          title: '5 Proven Strategies to Manage Anxiety in Daily Life',
          content: `
            <p>Anxiety disorders are among the most common mental health conditions, affecting millions of people worldwide. While occasional anxiety is a normal part of life, persistent, excessive worry can interfere with daily activities and quality of life.</p>
            
            <p>The good news is that anxiety is highly treatable. Here are five evidence-based strategies that can help you manage anxiety symptoms effectively:</p>
            
            <h2>1. Practice Mindfulness Meditation</h2>
            
            <p>Mindfulness meditation involves focusing on the present moment without judgment. This practice can help you observe anxious thoughts without getting caught up in them. Research shows that regular mindfulness practice can significantly reduce anxiety symptoms by:</p>
            
            <ul>
              <li>Increasing awareness of thought patterns</li>
              <li>Reducing rumination</li>
              <li>Improving emotional regulation</li>
              <li>Enhancing stress management</li>
            </ul>
            
            <p>Start with just 5 minutes daily and gradually increase your practice time. Many apps and online resources offer guided meditations specifically designed for anxiety management.</p>
            
            <h2>2. Implement Cognitive Behavioral Techniques</h2>
            
            <p>Cognitive Behavioral Therapy (CBT) is one of the most effective treatments for anxiety disorders. You can apply some CBT principles in your daily life:</p>
            
            <ul>
              <li><strong>Challenge negative thoughts:</strong> When anxious thoughts arise, ask yourself: "What's the evidence for and against this thought?" and "What's a more balanced perspective?"</li>
              <li><strong>Reframe situations:</strong> Practice looking at challenging situations from different angles</li>
              <li><strong>Gradual exposure:</strong> Slowly and systematically face situations that trigger mild anxiety, building confidence as you go</li>
            </ul>
            
            <h2>3. Establish Regular Exercise Habits</h2>
            
            <p>Physical activity is a powerful anxiety reducer. Exercise:</p>
            
            <ul>
              <li>Releases endorphins, the body's natural mood elevators</li>
              <li>Reduces muscle tension</li>
              <li>Improves sleep quality</li>
              <li>Increases self-efficacy</li>
            </ul>
            
            <p>Aim for at least 30 minutes of moderate exercise most days of the week. Activities like walking, swimming, yoga, and dancing are excellent options.</p>
            
            <h4>4. Prioritize Quality Sleep</h4>
            
            <p>Sleep and anxiety have a bidirectional relationship—anxiety can disrupt sleep, and poor sleep can exacerbate anxiety. Improve your sleep habits by:</p>
            
            <ul>
              <li>Maintaining a consistent sleep schedule</li>
              <li>Creating a relaxing bedtime routine</li>
              <li>Limiting screen time before bed</li>
              <li>Making your bedroom a comfortable, quiet environment</li>
              <li>Avoiding caffeine and alcohol close to bedtime</li>
            </ul>
            
            <h2>5. Build a Supportive Social Network</h2>
            
            <p>Social support is a crucial buffer against anxiety. Connecting with others can:</p>
            
            <ul>
              <li>Provide perspective on worries</li>
              <li>Reduce feelings of isolation</li>
              <li>Offer practical assistance during difficult times</li>
              <li>Create a sense of belonging</li>
            </ul>
            
            <p>Make time to nurture relationships with supportive friends and family. Consider joining support groups where you can connect with others who understand your experiences.</p>
            
            <h2>When to Seek Professional Help</h2>
            
            <p>While these strategies can be effective for managing everyday anxiety, it's important to seek professional help if:</p>
            
            <ul>
              <li>Anxiety significantly interferes with daily functioning</li>
              <li>You experience panic attacks</li>
              <li>Anxiety causes you to avoid important activities</li>
              <li>Self-help strategies aren't providing adequate relief</li>
            </ul>
            
            <p>Remember, reaching out for help is a sign of strength, not weakness. With the right support and tools, you can effectively manage anxiety and improve your quality of life.</p>
          `,
          snippet: 'Discover practical techniques to help reduce anxiety symptoms and improve your quality of life.',
          author: 'Psychologist Joan Muturi',
          category: 'Anxiety',
          createdAt: '2025-05-15T10:30:00Z',
          readTime: '5 min read',
          imageUrl: 'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        };
        
        setBlog(sampleBlog);
        document.title = `${sampleBlog.title} | RehabCare Blog`;
        
        // Sample related blogs
        const sampleRelatedBlogs = [
          {
            id: 8,
            title: 'Overcoming Social Anxiety: A Step-by-Step Guide',
            snippet: 'Follow this practical guide to gradually reduce social anxiety and build confidence in social situations.',
            author: 'Psychologist Joan Muturi',
            category: 'Anxiety',
            createdAt: '2025-05-30T09:30:00Z',
            readTime: '8 min read',
            imageUrl: 'https://images.pexels.com/photos/4049992/pexels-photo-4049992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 3,
            title: 'The Power of Mindfulness in Mental Health Treatment',
            snippet: 'Explore how mindfulness practices can significantly improve symptoms of depression, anxiety, and stress.',
            author: 'Psychologist Joan Muturi',
            category: 'Mindfulness',
            createdAt: '2025-04-12T09:45:00Z',
            readTime: '6 min read',
            imageUrl: 'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          },
          {
            id: 6,
            title: 'The Importance of Self-Care in Preventing Burnout',
            snippet: 'Discover essential self-care practices that can help prevent burnout and maintain your mental health.',
            author: 'Psychologist Joan',
            category: 'Self-Care',
            createdAt: '2025-05-15T10:15:00Z',
            readTime: '6 min read',
            imageUrl: 'https://images.pexels.com/photos/3772622/pexels-photo-3772622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
          }
        ]; 
        
        setRelatedBlogs(sampleRelatedBlogs);
      }
    };
    
    fetchBlog();
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [id]);
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading article...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!blog) {
    return (
      <div className="min-h-screen py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-2 mb-4">Article Not Found</h1>
            <p className="paragraph mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blogs" className="btn btn-primary">
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/blogs" className="inline-flex items-center text-gray-600 hover:text-blue-600">
              <ChevronLeft size={20} className="mr-1" />
              Back to All Articles
            </Link>
          </div>
          
          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {blog.category}
              </span>
              <span className="text-xs text-gray-500 ml-2 flex items-center">
                <Clock size={12} className="mr-1" />
                {blog.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <div className="flex items-center mr-4">
                <User size={14} className="mr-1" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>
          </div>
          
          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          {/* Social Share */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setLiked(!liked)}
                className={`inline-flex items-center px-3 py-1.5 border rounded-full text-sm ${liked ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
              >
                <Heart size={16} className={`mr-1 ${liked ? 'fill-red-600 text-red-600' : ''}`} />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShareOpen(!shareOpen)}
                  className="inline-flex items-center px-3 py-1.5 border rounded-full text-sm bg-gray-50 text-gray-700 border-gray-200"
                >
                  <Share2 size={16} className="mr-1" />
                  <span>Share</span>
                </button>
                {shareOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-white rounded-md shadow-lg p-2 z-10">
                    <div className="flex space-x-2">
                      <a href="https://www.facebook.com/share/16MtqRmSsR/" className="p-2 text-blue-600 hover:bg-blue-50 rounded-full" title="Share on Facebook">
                        <Facebook size={18} />
                      </a>
                      <a href="https://x.com/Elevat_2001?t=UmASimk78pIZyVuDEneoFw&s=09" className="p-2 text-blue-400 hover:bg-blue-50 rounded-full" title="Share on Twitter">
                        <Twitter size={18} />
                      </a>
                      <a href="https://www.linkedin.com/in/joan-muturi-b85753251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="p-2 text-blue-700 hover:bg-blue-50 rounded-full" title="Share on LinkedIn">
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <button className="inline-flex items-center px-3 py-1.5 border rounded-full text-sm bg-gray-50 text-gray-700 border-gray-200">
                <MessageCircle size={16} className="mr-1" />
                <span>Comment</span>
              </button>
            </div>
            
            <div>
              <span className="text-sm text-gray-500">
                {/* Simulated view count */}
                {Math.floor(Math.random() * 1000) + 500} views
              </span>
            </div>
          </div>
          
          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
          
          {/* Author Bio */}
          <div className="bg-gray-50 rounded-lg p-6 mb-12">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                {/* Placeholder avatar */}
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {blog.author?.charAt(0)}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">About the Author</h3>
                <p className="text-gray-600 mb-3">
                  {blog.author} is a licensed therapist specializing in anxiety disorders and cognitive behavioral therapy. With over 5 years of clinical experience, she helps clients develop practical strategies for managing anxiety and improving quality of life.
                </p>
                <div className="flex space-x-2">
                  <a href="https://x.com/Elevat_2001?t=UmASimk78pIZyVuDEneoFw&s=09" className="text-blue-600 hover:text-blue-800">
                    <Twitter size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/joan-muturi-b85753251?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-blue-600 hover:text-blue-800">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map(relatedBlog => (
                <Link 
                  key={relatedBlog.id} 
                  to={`/blogs/${relatedBlog.id}`}
                  className="card overflow-hidden group hover:shadow-md transition-all"
                >
                  <div className="overflow-hidden h-40">
                    <img
                      src={relatedBlog.imageUrl}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar size={12} className="mr-1" />
                      <span>{formatDate(relatedBlog.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Comments Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Comments (3)</h2>
            
            {/* Comment Form */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium mb-4">Leave a Comment</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>
                <div>
                  <textarea
                    placeholder="Your Comment"
                    rows={4}
                    className="input"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Post Comment
                </button>
              </form>
            </div>
            
            {/* Comments List */}
            <div className="space-y-6">
              {/* Comment 1 */}
              <div className="border-b pb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold">Jessica Moore</h4>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-700 mb-2">
                      Thank you for sharing these strategies! I've been practicing mindfulness meditation for the past month, and it's truly made a difference in how I handle anxious thoughts.
                    </p>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Comment 2 */}
              <div className="border-b pb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold">Robert Johnson</h4>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-gray-700 mb-2">
                      I found the section on CBT techniques particularly helpful. I've started challenging my negative thoughts using the questions you suggested, and it's helping me gain perspective on my worries.
                    </p>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Reply
                    </button>
                  </div>
                </div>
                
                {/* Nested Reply */}
                <div className="ml-12 mt-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        SJ
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold">Psychologist Joan <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded ml-2">Author</span></h4>
                        <span className="text-sm text-gray-500">5 days ago</span>
                      </div>
                      <p className="text-gray-700 mb-2">
                        I'm so glad you found that helpful, Robert! Consistent practice with these techniques can really make a difference over time.
                      </p>
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Comment 3 */}
              <div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold">Michelle Lee</h4>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-gray-700 mb-2">
                      I appreciate the section on when to seek professional help. It helped me realize that what I'm experiencing might need more support than just self-help strategies. I've scheduled an appointment with a therapist next week.
                    </p>
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;