import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Elevat Rehabilitation Center</h3>
            <p className="text-gray-400 mb-4">
              Providing compassionate care and rehabilitation services to help you on your journey to recovery. Our team of professionals is dedicated to your well-being.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/16MtqRmSsR/" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/Elevat_2001?t=UmASimk78pIZyVuDEneoFw&s=09" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/@elevatmentorship?si=3HzDXP9bHtjsaJzP" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-white transition-colors">
                  Book a Session
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-white transition-colors">
                  Read Our Blog
                </Link>
              </li>
              <li>
                <Link to="/help-center" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-400">
                  2344, Kiambu
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={18} />
                <a href="tel:+254704376452" className="text-gray-400 hover:text-white transition-colors">
                  +254 704 376 452 
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={18} />
                <a href="mailto:info@elevatrehabilitationcenter.org" className="text-gray-400 hover:text-white transition-colors">
                  info@elevatrehabilitationcenter.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates on our services and wellness tips.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
              <button type="submit" className="w-full btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Elevat Rehabilitation Center. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              {/* <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;