import React from 'react';
import { 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Apple,
  Smartphone
} from 'lucide-react';
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-[#7030A0] to-purple-600 p-2 rounded-lg mr-3">
                  <img src={logo} alt="Logo" className="h-6 w-6 object-contain" />
              </div>
              <h1 className="text-2xl font-bold">TheBoom</h1>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              The premier financial social networking platform connecting professionals, 
              sharing insights, and building the future of finance together.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#7030A0] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#7030A0] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#7030A0] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-[#7030A0] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Premium</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Security</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Mobile Apps</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">API</a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">Community Guidelines</a>
            </div>
          </div> */}
        </div>

        {/* <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 lg:mb-0">
              <div className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@finconnect.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-2" />
                <span>1-800-FINCONN</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Download our app:</span>
              <button className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Apple className="h-5 w-5 mr-2" />
                <span className="text-sm">App Store</span>
              </button>
              <button className="flex items-center bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Smartphone className="h-5 w-5 mr-2" />
                <span className="text-sm">Google Play</span>
              </button>
            </div>
          </div>
          
          <div className="text-center lg:text-left mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © 2025 TheBoom. All rights reserved. | Connecting financial professionals worldwide.
            </p>
          </div>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;