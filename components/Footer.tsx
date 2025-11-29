import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME_ENG, APP_NAME_URDU, CONTACT_PHONE, LOGO_PATH } from '../constants';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-accent-600">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Logo */}
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-4">
                <img 
                    src={LOGO_PATH} 
                    alt="Logo" 
                    className="h-16 w-16 object-contain bg-white rounded-full p-1" 
                    onError={(e) => (e.target as HTMLImageElement).style.opacity = '0'}
                />
             </div>
            <h3 className="text-xl text-white font-urdu mb-2">{APP_NAME_URDU}</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Dedicated to providing authentic Islamic guidance and religious rulings (Fatwas) to the community in light of the Quran and Sunnah.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm border-b border-gray-700 pb-2 inline-block">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-accent-500 transition-colors">Home</Link></li>
              <li><Link to="/browse" className="hover:text-accent-500 transition-colors">Browse Fatwas</Link></li>
              <li><Link to="/ask" className="hover:text-accent-500 transition-colors">Ask a Question</Link></li>
              <li><a href="#" className="hover:text-accent-500 transition-colors">About Us</a></li>
            </ul>
          </div>
          
           {/* Legal/Other */}
           <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm border-b border-gray-700 pb-2 inline-block">Information</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-accent-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent-500 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="hover:text-accent-500 transition-colors">Mufti Panel</a></li>
              <li><a href="#" className="hover:text-accent-500 transition-colors">Donate</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm border-b border-gray-700 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent-500 flex-shrink-0" />
                <span>Jamia Arabia Siraj-ul-Ulum,<br/>Mansehra, Khyber Pakhtunkhwa,<br/>Pakistan</span>
              </li>
              <li className="flex items-center group">
                <Phone className="w-5 h-5 mr-3 text-accent-500 flex-shrink-0 group-hover:text-white transition-colors" />
                <span className="font-mono text-lg">{CONTACT_PHONE}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent-500 flex-shrink-0" />
                <span>info@sirajululum.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {APP_NAME_ENG}. All rights reserved.</p>
          <div className="mt-4 md:mt-0 text-center md:text-right">
             <p className="italic opacity-50">"Ask those who know if you do not know" (Quran 16:43)</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;