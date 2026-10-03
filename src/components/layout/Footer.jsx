import { MapPin, Phone, Mail } from 'lucide-react';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-300 pt-10 md:pt-16 pb-6 md:pb-8 font-roboto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-8 mb-8 md:mb-12">
          {/* About Column */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-white text-xl font-montserrat font-bold mb-4 md:mb-6">
              <span className="text-primary">B</span>eautyShop
            </h3>
            <p className="mb-6 text-sm leading-relaxed">
              BeautyShop BD is your ultimate destination for authentic and branded cosmetics, skincare, and beauty products in Bangladesh. We bring you the best globally.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <FacebookIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <InstagramIcon />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-base md:text-lg font-montserrat font-semibold mb-4 md:mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Return Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white text-base md:text-lg font-montserrat font-semibold mb-4 md:mb-6">Top Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-primary transition-colors">Makeup</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Skin Care</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Hair Care</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Fragrances</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Bath & Body</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white text-base md:text-lg font-montserrat font-semibold mb-4 md:mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Navana Tower, Gulshan 1, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+88 01613 681441</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@glamourshopbd.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} BeautyShop BD. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0 flex gap-2">
            <span className="px-3 h-[30px] inline-flex items-center rounded bg-gray-700 text-white text-[11px] font-semibold">Visa</span>
            <span className="px-3 h-[30px] inline-flex items-center rounded bg-gray-700 text-white text-[11px] font-semibold">Mastercard</span>
            <span className="px-3 h-[30px] inline-flex items-center rounded bg-gray-700 text-white text-[11px] font-semibold">bKash</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
