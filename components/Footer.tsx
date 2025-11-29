import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME_ENG, APP_NAME_URDU } from '../constants';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* About */}
          <div>
            <h3 className="text-2xl text-white font-urdu mb-4">{APP_NAME_URDU}</h3>
            <h4 className="text-lg font-serif text-primary-400 mb-4">{APP_NAME_ENG}</h4>
            <p className="text-sm leading-relaxed text-gray-400">
              Dedicated to providing authentic Islamic guidance and religious rulings (Fatwas) to the community in light of the Quran and Sunnah.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/browse" className="hover:text-primary-400 transition-colors">Browse Fatwas</Link></li>
              <li><Link to="/ask" className="hover:text-primary-400 transition-colors">Ask a Question</Link></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                <span>Jamia Arabia Siraj-ul-Ulum,<br/>Mansehra, Khyber Pakhtunkhwa,<br/>Pakistan</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                <span>+92 123 456 7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary-500 flex-shrink-0" />
                <span>info@sirajululum.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {APP_NAME_ENG}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;