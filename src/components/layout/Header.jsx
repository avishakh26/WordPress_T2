import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, Search, User, Heart, ShoppingBag, Menu, ChevronDown, X } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { products } from '../../data/products';
import { demoImage } from '../../data/demoImages';

// Inline SVG social icons (lucide-react doesn't include these)
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const { cartItems, setIsCartOpen } = useCart();
  const { wishlistItems } = useWishlist();
  const allCategories = [...new Set(products.map(p => p.category))];
  
  const searchSuggestions = searchQuery.trim() !== '' 
    ? products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5)
    : [];
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname !== '/' && e.target.value.trim() !== '') {
      navigate('/');
    }
  };

  return (
    <header className="w-full relative z-[150] bg-white">
      {/* Top Bar */}
      <div className="bg-[#f5f5f5] text-textMuted text-xs py-2 border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 hover:text-primary transition cursor-pointer">
              <Phone className="w-3 h-3" /> +8801613681441
            </span>
            <span className="flex items-center gap-1 hover:text-primary transition cursor-pointer">
              <Mail className="w-3 h-3" /> info@glamourshopbd.com
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <a href="#" className="hover:text-primary"><FacebookIcon /></a>
              <a href="#" className="hover:text-primary"><InstagramIcon /></a>
              <a href="#" className="hover:text-primary"><TwitterIcon /></a>
            </div>
            <div className="border-l border-gray-300 pl-4 space-x-3">
              <Link to="#" className="hover:text-primary">Order Tracking</Link>
              <Link to="#" className="hover:text-primary">FAQs</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header (Logo, Search, Icons) */}
      <div className="bg-white py-3 md:py-5 shadow-sm">
        <div className="container mx-auto px-4">
          
          {/* Top Row for Mobile (Hamburger, Logo, Icons) */}
          <div className="flex items-center justify-between mb-3 md:mb-0">
            <div className="flex items-center gap-2 md:gap-0">
              {/* Mobile Hamburger */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-red-500 mr-2 p-1">
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Logo */}
              <Link to="/" className="text-2xl md:text-3xl font-montserrat font-bold text-secondary flex items-center gap-1 md:gap-2">
                <img src="/favicon.svg" alt="Logo" className="w-8 h-8 hidden" /> {/* Placeholder for graphic logo if needed */}
                <span className="text-[#d4af37] font-light hidden md:inline">BEAUTY</span>
                <div className="md:hidden flex flex-col items-center">
                  <span className="text-[#d4af37] text-xl sm:text-2xl font-light tracking-wider">BEAUTY</span>
                  <span className="text-[8px] text-gray-500 uppercase tracking-widest leading-none">Shop BD</span>
                </div>
                <div className="hidden md:flex flex-col text-[10px] text-gray-500 uppercase tracking-widest leading-none mt-1">
                  <span>Shop BD</span>
                </div>
              </Link>
            </div>

            {/* Desktop Search Bar and Brand Mega Menu (Hidden on Mobile) */}
            <div className="hidden md:flex flex-1 max-w-3xl mx-6 items-center gap-6">
              {/* Brand Mega Menu Toggle */}
              <div className="relative group flex items-center h-full">
                <div className="flex items-center text-sm font-semibold text-gray-800 cursor-pointer py-4">
                  Brand <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
                </div>
                
                {/* Mega Menu Content */}
                <div className="absolute top-full -left-10 w-[700px] lg:w-[800px] bg-[#f8f9fa] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-200 rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] flex text-left">
                  
                  {/* Left Sidebar: Top Brand */}
                  <div className="w-1/3 bg-white border-r border-gray-200 py-4 px-6 flex flex-col max-h-[450px] overflow-y-auto">
                    <h3 className="text-[#0a4275] font-bold text-base mb-4">Top Brand</h3>
                    <ul className="flex flex-col gap-3">
                      {['Anua', 'Centella', 'Cosrx', 'Everly', 'Lily', 'Medicube', 'Nior', 'Sheglam', 'Swish Beauty', 'Mars', 'Celimax', 'Trendy Beauty', 'Beauty Glazed', 'Simple', 'Skino', 'Pastel Beauty', 'Imagic', 'Sunsilk', 'Dot & Key'].map(brand => (
                        <li key={brand}>
                          <Link to={`/brand/${encodeURIComponent(brand.toLowerCase())}`} className="text-gray-700 text-[13px] hover:text-primary transition-colors">
                            {brand}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Content: Popular Brand */}
                  <div className="w-2/3 py-4 px-6 bg-[#f8f9fa]">
                    <div className="border-b border-[#0a4275] mb-4 relative flex justify-center">
                      <h3 className="text-[#0a4275] font-bold text-base bg-[#f8f9fa] px-4 relative top-2.5">Popular Brand</h3>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mt-8">
                      {['Anua', 'Sheglam', 'Centella', 'Cosrx', 'Everly', 'Lily', 'Medicube', 'Nior', 'Sheglam', 'Swiss Beauty'].map((brand, idx) => (
                        <Link key={idx} to={`/brand/${encodeURIComponent(brand.toLowerCase())}`} className="relative bg-white border border-gray-100 overflow-hidden flex items-end justify-center hover:shadow-md transition-shadow aspect-[3/2]">
                          <img src={demoImage('skin', brand + idx)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                          <span className="relative w-full bg-white/90 text-center text-[11px] font-semibold text-secondary py-1">{brand}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Input */}
              <div className="relative flex flex-1">
                <div className="flex w-full border border-purple-400 rounded-full overflow-hidden h-10 bg-white">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="flex-1 px-5 focus:outline-none text-sm"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => { setSearchQuery(''); setShowSuggestions(false); }}
                      className="px-3 text-gray-400 hover:text-gray-600 flex items-center justify-center bg-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 transition-colors flex items-center justify-center">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && searchSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-[100] overflow-hidden">
                    {searchSuggestions.map(product => (
                      <Link 
                        key={product.id} 
                        to={`/product/${product.id}`}
                        onClick={() => { setShowSuggestions(false); setSearchQuery(''); }}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 transition-colors"
                      >
                        <img src={product.image} alt={product.title} className="w-10 h-10 object-contain rounded" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800 line-clamp-1">{product.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            {product.oldPrice && <span className="text-gray-400 line-through text-xs">৳{product.oldPrice}</span>}
                            <span className="text-primary font-bold text-sm">৳{product.price}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <button className="flex flex-col items-center text-secondary hover:text-primary transition group">
                <User className="w-5 h-5 md:w-6 md:h-6 mb-1 md:group-hover:-translate-y-1 transition-transform" />
                <span className="hidden md:inline text-[10px] font-medium uppercase tracking-wider">Account</span>
              </button>
              <Link to="/wishlist" className="hidden md:flex flex-col items-center text-secondary hover:text-primary transition relative group">
                <Heart className="w-6 h-6 mb-1 group-hover:-translate-y-1 transition-transform" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
                <span className="text-[10px] font-medium uppercase tracking-wider">Wishlist</span>
              </Link>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="flex flex-col items-center text-secondary hover:text-primary transition relative group"
              >
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 mb-1 md:group-hover:-translate-y-1 transition-transform" />
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
                <span className="hidden md:inline text-[10px] font-medium uppercase tracking-wider">Cart</span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (Only visible on mobile) */}
          <div className="flex md:hidden w-full border border-purple-400 rounded-full overflow-hidden h-10 shadow-sm">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 px-4 focus:outline-none text-sm"
            />
            <button className="bg-purple-600 text-white px-5 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Navigation Menu Bar */}
      <div className="bg-white text-secondary border-t border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4 flex items-center h-12">
          
          {/* Main Links */}
          <nav className="flex-1 flex items-center justify-between px-2 lg:px-6 text-[10px] lg:text-sm font-medium uppercase tracking-wider">
            {/* Categories on the Left */}
            <div className="flex items-center gap-3 lg:gap-6">
              {[
                { name: 'MAKEUP', path: 'Makeup' },
                { name: 'SKIN CARE', path: 'Skin Care' },
                { name: 'HAIR CARE', path: 'Hair Care' },
                { name: 'BODY CARE', path: 'Body Care' },
                { name: 'ACCESSSORIES', path: 'Accessories' }
              ].map(cat => (
                <div key={cat.name} className="relative group py-3 cursor-pointer text-gray-800">
                  <span className="hover:text-primary transition flex items-center gap-1">{cat.name} <ChevronDown className="w-4 h-4" /></span>
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 text-secondary shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-b-lg">
                    <ul className="py-2">
                      <li>
                        <Link to={`/category/${encodeURIComponent(cat.path)}`} className="block px-4 py-2 hover:bg-orange-50 hover:text-primary transition-colors text-sm normal-case tracking-normal">
                          Shop All {cat.path}
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/${encodeURIComponent(cat.path)}`} className="block px-4 py-2 hover:bg-orange-50 hover:text-primary transition-colors text-sm normal-case tracking-normal">
                          New Arrivals
                        </Link>
                      </li>
                      <li>
                        <Link to={`/category/${encodeURIComponent(cat.path)}`} className="block px-4 py-2 hover:bg-orange-50 hover:text-primary transition-colors text-sm normal-case tracking-normal">
                          Top Rated
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Sale Buttons on the Right */}
            <div className="flex items-center gap-1.5 lg:gap-3 ml-3">
              <Link to="/sale/k-beauty" className="bg-[#FF007F] hover:bg-[#D9006C] text-white px-4 py-2 rounded-sm shadow-sm transition whitespace-nowrap text-xs font-bold capitalize">K-Beauty Sale</Link>
              <Link to="/sale/clearance" className="bg-[#D30000] hover:bg-[#A60000] text-white px-4 py-2 rounded-sm shadow-sm transition whitespace-nowrap text-xs font-bold capitalize">Clearance Sale</Link>
              <Link to="/sale/j-beauty" className="bg-[#7800D7] hover:bg-[#5E00B3] text-white px-4 py-2 rounded-sm shadow-sm transition whitespace-nowrap text-xs font-bold capitalize">J-Beauty Sale</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Slides from Top) */}
      <div className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 md:hidden overflow-hidden transition-all duration-300 ease-in-out z-50 ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col overflow-y-auto max-h-[80vh]">
          <div className="py-2">
            {[
              { name: 'MAKEUP', path: 'Makeup' },
              { name: 'SKIN CARE', path: 'Skin Care' },
              { name: 'HAIR CARE', path: 'Hair Care' },
              { name: 'BODY CARE', path: 'Body Care' },
              { name: 'ACCESSSORIES', path: 'Accessories' }
            ].map(cat => (
              <div key={cat.name} className="border-b border-gray-50">
                <div 
                  className="flex items-center justify-between p-4 text-[13px] font-semibold text-gray-800 cursor-pointer hover:bg-gray-50"
                  onClick={() => setOpenMobileCategory(openMobileCategory === cat.name ? null : cat.name)}
                >
                  {cat.name}
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${openMobileCategory === cat.name ? 'rotate-180' : ''}`} />
                </div>
                <div className={`overflow-hidden transition-all duration-300 bg-gray-50 ${openMobileCategory === cat.name ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <ul className="py-2 px-6">
                    <li><Link to={`/category/${encodeURIComponent(cat.path)}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[13px] text-gray-600">Shop All {cat.path}</Link></li>
                    <li><Link to={`/category/${encodeURIComponent(cat.path)}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[13px] text-gray-600">New Arrivals</Link></li>
                    <li><Link to={`/category/${encodeURIComponent(cat.path)}`} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-[13px] text-gray-600">Top Rated</Link></li>
                  </ul>
                </div>
              </div>
            ))}

            <div className="p-4 grid grid-cols-1 gap-2">
              <Link to="/sale/k-beauty" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#FF007F] text-white text-center text-sm font-bold py-2.5 rounded">K-Beauty Sale</Link>
              <Link to="/sale/clearance" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#D30000] text-white text-center text-sm font-bold py-2.5 rounded">Clearance Sale</Link>
              <Link to="/sale/j-beauty" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#7800D7] text-white text-center text-sm font-bold py-2.5 rounded">J-Beauty Sale</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
