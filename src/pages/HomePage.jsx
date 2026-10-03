import React, { Fragment, useState } from 'react';
import { ArrowRight, ShoppingCart, Heart, Star, ShieldCheck, Truck, Headphones, RotateCcw, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import heroImage from '../assets/hero.png';
import heroImage2 from '../assets/hero2.jpg';
import heroImage3 from '../assets/hero3.jpg';
import heroImage4 from '../assets/hero4.jpg';

import catSkincare from '../assets/cat_skincare.png';
import catMakeup from '../assets/cat_makeup.png';
import catHaircare from '../assets/cat_haircare.png';
import catFragrance from '../assets/cat_fragrance.png';
import catBodycare from '../assets/cat_bodycare.png';
import catAccessories from '../assets/cat_accessories.png';
import skinoPromo from '../assets/skino_promo_banner.png';
import promoMakeup from '../assets/makeup_sale_banner.png';
import promoFragrances from '../assets/new_fragrances_banner.png';

import brandCosrx from '../assets/brand_cosrx.png';
import brandCentella from '../assets/brand_centella.png';
import brandMedicube from '../assets/brand_medicube.png';
import brandAnua from '../assets/brand_anua.png';

// Skin Concerns
import concern0 from '../assets/skin_concerns/concern_0.png';
import concern1 from '../assets/skin_concerns/concern_1.png';
import concern2 from '../assets/skin_concerns/concern_2.png';
import concern3 from '../assets/skin_concerns/concern_3.png';
import concern4 from '../assets/skin_concerns/concern_4.png';
import concern5 from '../assets/skin_concerns/concern_5.png';
import concern6 from '../assets/skin_concerns/concern_6.png';
import concern7 from '../assets/skin_concerns/concern_7.png';
import concern8 from '../assets/skin_concerns/concern_8.png';
import concern9 from '../assets/skin_concerns/concern_9.png';

import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { demoImage } from '../data/demoImages';
import { productArt } from '../data/productArt';

// Reusable Product Card Component
const ProductCard = ({ product, addToCart, toggleWishlist, isWishlisted }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow group relative flex flex-col border border-gray-100 p-3">
    {product.oldPrice && (
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded z-10">
        -{(100 - (product.price / product.oldPrice) * 100).toFixed(0)}%
      </div>
    )}
    <div className="relative mb-3 aspect-square overflow-hidden bg-gray-50 flex items-center justify-center">
      <Link to={`/product/${product.id}`} className="block w-full h-full">
        <img src={product.image} alt={product.title} loading="lazy" className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 p-2" />
      </Link>
      {/* Wishlist button always visible on mobile, hover on desktop */}
      <button
        onClick={() => toggleWishlist(product)}
        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow transition-all z-10 ${
          isWishlisted(product.id) ? 'bg-red-500 text-white scale-110' : 'bg-white text-gray-400 hover:text-red-500 hover:scale-110'
        }`}
        title={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart className="w-4 h-4" fill={isWishlisted(product.id) ? 'white' : 'none'} />
      </button>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 duration-300">
        <button
          onClick={() => addToCart(product)}
          className="bg-primary text-white px-4 h-9 rounded-full flex items-center gap-1.5 hover:bg-primaryDark shadow-md text-xs font-semibold"
          title="Add to Cart"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
        </button>
      </div>
    </div>
    <div className="flex flex-col flex-1">
      <Link to={`/category/${encodeURIComponent(product.category)}`}>
        <span className="text-xs text-primary mb-1 inline-block hover:underline">{product.category}</span>
      </Link>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-medium text-secondary leading-snug mb-2 line-clamp-2 hover:text-primary transition-colors text-sm">{product.title}</h3>
      </Link>
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
        ))}
        <span className="text-xs text-gray-400">({product.reviews || 0})</span>
      </div>
      <div className="mt-auto">
        {product.oldPrice && <span className="text-xs text-gray-400 line-through block">৳{product.oldPrice}</span>}
        <span className="text-lg font-bold text-primary">৳{product.price}</span>
      </div>
    </div>
  </div>
);


const HomePage = () => {
  const { searchQuery } = useSearch();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [activeTab, setActiveTab] = useState('Best Selling');

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group products by category
  const allCategories = [...new Set(products.map(p => p.category))];
  const productsByCategory = allCategories.reduce((acc, cat) => {
    acc[cat] = products.filter(p => p.category === cat);
    return acc;
  }, {});

  const cosmeticCategories = [
    { name: 'Skin Care', img: catSkincare },
    { name: 'Makeup', img: catMakeup },
    { name: 'Hair Care', img: catHaircare },
    { name: 'Fragrance', img: catFragrance },
    { name: 'Body Care', img: catBodycare },
    { name: 'Accessories', img: catAccessories },
  ];

  const topBrands = [
    { name: 'Cosrx', tagline: 'Skin first, hype later', img: brandCosrx },
    { name: 'Centella', tagline: 'Pure centella, pure glow', img: brandCentella },
    { name: 'Medicube', tagline: 'Clinic-level care, Everyday glow', img: brandMedicube },
    { name: 'Anua', tagline: 'Calm skin, Clear glow', img: brandAnua },
    { name: 'Sheglam', tagline: 'Bold, Affordable, High-Quality Beauty', img: demoImage('makeup', 'Sheglam') },
    { name: 'Nior', tagline: 'Elegance in Every Detail', img: demoImage('makeup', 'Nior') },
    { name: 'Everly', tagline: 'Effortless Beauty, Everyday Glow', img: demoImage('makeup', 'Everly') },
    { name: 'Swiss Beauty', tagline: 'Expecting Tomorrow', img: demoImage('makeup', 'Swiss+Beauty') },
  ];

  const bestSellingProducts = [
    { id: 'b1', title: 'Nior Lively Waterproof & Long Lasting Lip Liner', price: 120, oldPrice: 150, image: productArt({ id: 'b1', title: 'Nior Lively Waterproof & Long Lasting Lip Liner', category: 'Makeup', brand: 'Nior Lively Waterproof & Long Lasting Lip Liner'.split(' ')[0] }) },
    { id: 'b2', title: 'Everly Glow Lip Oil', price: 150, image: productArt({ id: 'b2', title: 'Everly Glow Lip Oil', category: 'Makeup', brand: 'Everly Glow Lip Oil'.split(' ')[0] }) },
    { id: 'b3', title: 'Swiss Beauty Long Stay Automatic Lip', price: 120, oldPrice: 150, image: productArt({ id: 'b3', title: 'Swiss Beauty Long Stay Automatic Lip', category: 'Makeup', brand: 'Swiss Beauty Long Stay Automatic Lip'.split(' ')[0] }) },
    { id: 'b4', title: 'Sheglam Power Shot Treatment', price: 120, oldPrice: 150, discount: 20, image: productArt({ id: 'b4', title: 'Sheglam Power Shot Treatment', category: 'Makeup', brand: 'Sheglam Power Shot Treatment'.split(' ')[0] }) },
    { id: 'b5', title: 'Cosrx BHA Blackhead Power Liquid', price: 1650, image: productArt({ id: 'b5', title: 'Cosrx BHA Blackhead Power Liquid', category: 'Makeup', brand: 'Cosrx BHA Blackhead Power Liquid'.split(' ')[0] }) },
    { id: 'b6', title: 'Loreal Paris Infallible Pro Matte', price: 1100, oldPrice: 1400, image: productArt({ id: 'b6', title: 'Loreal Paris Infallible Pro Matte', category: 'Makeup', brand: 'Loreal Paris Infallible Pro Matte'.split(' ')[0] }) },
    { id: 'b7', title: 'Some By Mi AHA BHA PHA 30 Days', price: 1250, discount: 15, image: productArt({ id: 'b7', title: 'Some By Mi AHA BHA PHA 30 Days', category: 'Makeup', brand: 'Some By Mi AHA BHA PHA 30 Days'.split(' ')[0] }) },
    { id: 'b8', title: 'Maybelline Fit Me Matte + Poreless', price: 850, image: productArt({ id: 'b8', title: 'Maybelline Fit Me Matte + Poreless', category: 'Makeup', brand: 'Maybelline Fit Me Matte + Poreless'.split(' ')[0] }) },
  ];

  const latestProducts = [
    { id: 'l1', title: 'Cosrx Advanced Snail 96 Mucin Power Essence', price: 950, oldPrice: 1200, discount: 20, image: productArt({ id: 'l1', title: 'Cosrx Advanced Snail 96 Mucin Power Essence', category: 'Skin Care', brand: 'Cosrx Advanced Snail 96 Mucin Power Essence'.split(' ')[0] }) },
    { id: 'l2', title: 'Anua Heartleaf 77% Soothing Toner', price: 1100, image: productArt({ id: 'l2', title: 'Anua Heartleaf 77% Soothing Toner', category: 'Skin Care', brand: 'Anua Heartleaf 77% Soothing Toner'.split(' ')[0] }) },
    { id: 'l3', title: 'Medicube Zero Pore Pad 2.0', price: 1450, oldPrice: 1600, discount: 10, image: productArt({ id: 'l3', title: 'Medicube Zero Pore Pad 2.0', category: 'Skin Care', brand: 'Medicube Zero Pore Pad 2.0'.split(' ')[0] }) },
    { id: 'l4', title: 'Centella Asiatica Ampoule 100ml', price: 1300, image: productArt({ id: 'l4', title: 'Centella Asiatica Ampoule 100ml', category: 'Skin Care', brand: 'Centella Asiatica Ampoule 100ml'.split(' ')[0] }) },
    { id: 'l5', title: 'Innisfree Green Tea Seed Serum', price: 2100, image: productArt({ id: 'l5', title: 'Innisfree Green Tea Seed Serum', category: 'Skin Care', brand: 'Innisfree Green Tea Seed Serum'.split(' ')[0] }) },
    { id: 'l6', title: 'Laneige Lip Sleeping Mask', price: 1500, oldPrice: 1800, discount: 5, image: productArt({ id: 'l6', title: 'Laneige Lip Sleeping Mask', category: 'Skin Care', brand: 'Laneige Lip Sleeping Mask'.split(' ')[0] }) },
    { id: 'l7', title: 'Missha Time Revolution Night Repair', price: 2800, image: productArt({ id: 'l7', title: 'Missha Time Revolution Night Repair', category: 'Skin Care', brand: 'Missha Time Revolution Night Repair'.split(' ')[0] }) },
    { id: 'l8', title: 'Beauty of Joseon Relief Sun Rice', price: 1350, oldPrice: 1500, image: productArt({ id: 'l8', title: 'Beauty of Joseon Relief Sun Rice', category: 'Skin Care', brand: 'Beauty of Joseon Relief Sun Rice'.split(' ')[0] }) },
  ];

  const displayedProducts = activeTab === 'Best Selling' ? bestSellingProducts : latestProducts;

  const skinConcerns = [
    { id: 'Acne Care', topTitle: 'ACNE CARE', title: 'Acne Care', subtitle: 'Fight Acne, Shine Brighter', image: concern0 },
    { id: 'Anti Aging', topTitle: 'ANTI AGING', title: 'Anti Aging', subtitle: 'Turn Back Time, Keep the Glow', image: concern1 },
    { id: 'Spot Treatment', topTitle: 'SPOT SOLUTION', title: 'Spot Treatment', subtitle: 'Clear Skin, Spot-Free Confidence', image: concern2 },
    { id: 'Skin Dryness', topTitle: 'DRY SKIN', title: 'Skin Dryness', subtitle: 'Deep Hydration, Lasting Comfort', image: concern3 },
    { id: 'Oil Control', topTitle: 'OIL CONTROL', title: 'Oil Control', subtitle: 'Fight Acne, Shine Brighter', image: concern4 },
    { id: 'Sensitive Skin', topTitle: 'SENSITIVE SKIN', title: 'Sensitive skin', subtitle: 'Fight Acne, Shine Brighter', image: concern5 },
    { id: 'Dandruff', topTitle: 'DANDRUFF TREATMENT', title: 'Dandruff', subtitle: 'Dandruff-Free, Worry-Free', image: concern6 },
    { id: 'Hairfall', topTitle: 'HAIRFALL SOLUTION', title: 'Hairfall', subtitle: 'Say No to Fall, Yes to Fuller Hair', image: concern7 },
    { id: 'Combination Skin', topTitle: 'COMBINATION SKIN', title: 'Combination Skin', subtitle: 'Deep Hydration, Lasting Comfort', image: concern8 },
    { id: 'Dull Skin', topTitle: 'DULL SKIN', title: 'Dull Skin', subtitle: 'Fight Acne, Shine Brighter', image: concern9 },
  ];

  return (
    <div className="bg-white">
      {/* Hero Slider */}
      <section className="w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="home-hero aspect-[1717/916] md:aspect-auto md:h-[500px]"
        >
          {/* <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden bg-gray-100">
              <img src={heroImage} alt="Featured beauty products" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/20" />
              <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                <div className="max-w-xl text-white">
                  <span className="text-primary font-bold tracking-wider uppercase mb-2 block">New Arrivals</span>
                  <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-4 leading-tight">Authentic Beauty Products</h1>
                  <p className="text-white/90 mb-8 text-lg">Discover the best international cosmetic brands in Bangladesh.</p>
                  <button className="bg-primary hover:bg-primaryDark text-white px-8 py-3 font-semibold uppercase tracking-wide transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide> */}
          <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden bg-gray-100">
              <img src={heroImage2} alt="Premium skincare collection" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 md:bg-black/25" />
              <div className="container mx-auto px-4 h-full flex items-center justify-end text-right relative z-10">
                {/* Text overlay removed as requested */}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden bg-gray-100">
              <img src={heroImage3} alt="Premium cosmetics" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 md:bg-black/25" />
              <div className="container mx-auto px-4 h-full flex items-center justify-end text-right relative z-10">
                {/* Text overlay removed as requested */}
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative w-full h-full overflow-hidden bg-gray-100">
              <img src={heroImage4} alt="Luxury fragrances" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 md:bg-black/25" />
              <div className="container mx-auto px-4 h-full flex items-center relative z-10">
                {/* Text overlay removed as requested */}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Top Categories */}
      <section className="py-6 border-b border-gray-100">
        <div className="container mx-auto px-2 md:px-4">
          <h2 className="text-[17px] md:text-2xl font-serif font-extrabold text-[#003366] mb-6 md:mb-8 text-center uppercase tracking-wide">
            EXPLORE PRODUCT BY CATEGORY
          </h2>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:flex md:gap-8 pb-4 justify-center px-1">
            {cosmeticCategories.map((cat, idx) => (
              <Link key={idx} to={`/category/${encodeURIComponent(cat.name)}`} className="flex flex-col items-center group cursor-pointer md:min-w-[100px]">
                <div className="w-full aspect-square md:w-36 md:h-36 rounded-2xl sm:rounded-3xl md:rounded-full bg-gradient-to-b from-purple-200 via-purple-300 to-[#c758e8] p-[3px] mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                  <div className="w-full h-full rounded-[1.1rem] sm:rounded-[1.4rem] md:rounded-full overflow-hidden bg-white">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <span className="font-semibold text-[#004b7a] group-hover:text-primary transition-colors text-center text-[10px] sm:text-[12px] md:text-base leading-tight mt-1 truncate w-full px-1">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4">
          <div className="w-full bg-gradient-to-r from-[#7bc4f4] to-[#9cd8f7] rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 border border-blue-200">
            {/* Delivery Badge */}
            <div className="flex items-center gap-3 bg-gradient-to-b from-[#dfbb41] to-[#b99120] text-white px-5 py-2.5 rounded-lg shadow-lg border-2 border-[#f7da72]">
              <Truck className="w-10 h-10 md:w-12 md:h-12 text-white" strokeWidth={1.5} />
              <div className="flex flex-col items-start leading-none">
                <span className="font-extrabold text-xl md:text-3xl tracking-wide">FREE</span>
                <span className="text-[11px] md:text-sm font-bold tracking-widest mt-1">DELIVERY</span>
              </div>
            </div>
            
            {/* Promo Text */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mt-2 md:mt-0">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
                <span>On All</span>
                <span className="bg-gradient-to-b from-[#dfbb41] to-[#b99120] text-white px-3 py-0.5 rounded-md shadow-md border border-[#f7da72] font-extrabold">Skino</span>
                <span>Products</span>
              </div>
              <span className="text-sm md:text-lg text-gray-800 mt-2 font-medium">Don't miss the chance to glow for less</span>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Top Brands */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl md:text-3xl font-montserrat font-semibold text-secondary">Explore Our Top Brands</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {topBrands.map((brand, idx) => (
              <Link key={idx} to={`/brand/${encodeURIComponent(brand.name.toLowerCase())}`} className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-shadow overflow-hidden border border-gray-50 flex flex-col text-center cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-to-t from-gray-50 to-white p-1">
                  <img src={brand.img} alt={brand.name} loading="lazy" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="p-3 flex flex-col flex-1 justify-center">
                  <h3 className="text-black font-bold font-montserrat text-sm md:text-lg tracking-wide">{brand.name}</h3>
                  <p className="hidden md:block text-xs text-textMain mt-1 font-medium">{brand.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products / Best Selling */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-8 relative">
            <div className="flex items-center justify-center w-full gap-4 md:gap-8 font-bold text-[13px] md:text-sm">
              <button 
                onClick={() => setActiveTab('Latest Products')}
                className={`uppercase tracking-wider transition-colors ${activeTab === 'Latest Products' ? "text-primary relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-primary" : "text-gray-600 hover:text-primary"}`}
              >Latest Products</button>
              <span className="text-gray-300">/</span>
              <button 
                onClick={() => setActiveTab('Best Selling')}
                className={`uppercase tracking-wider transition-colors ${activeTab === 'Best Selling' ? "text-primary relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-primary" : "text-gray-600 hover:text-primary"}`}
              >Best Selling</button>
            </div>
            {/* Arrows */}
            <div className="hidden md:flex gap-2 absolute right-0">
              <button className="latest-prev w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors text-xs font-light cursor-pointer z-10 bg-white">
                 &lt;
              </button>
              <button className="latest-next w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-colors text-xs font-light cursor-pointer z-10 bg-white">
                 &gt;
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl: '.latest-prev', nextEl: '.latest-next' }}
            spaceBetween={0}
            slidesPerView={2}
            breakpoints={{
              768: { slidesPerView: 4 }
            }}
            className="border-l border-t border-gray-100"
          >
             {displayedProducts.map(product => (
               <SwiperSlide key={product.id} className="border-r border-b border-gray-100 p-4 md:p-6 flex flex-col group relative bg-white !h-auto">
                 {product.discount && (
                   <span className="absolute top-4 right-4 bg-[#7a2dd4] text-white text-[11px] font-bold w-9 h-9 rounded-full flex items-center justify-center z-10 shadow-sm pointer-events-none">
                     -{product.discount}%
                   </span>
                 )}
                 <div className="relative aspect-square mb-4 overflow-hidden flex items-center justify-center">
                    <Link to={`/product/${product.id}`} className="block w-full h-full">
                      <img src={product.image} alt={product.title} loading="lazy" className="object-cover w-full h-full" />
                    </Link>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-white/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-end pb-8 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                       <button 
                         onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                         className={`flex items-center gap-1.5 hover:text-gray-900 mb-3 text-[13px] font-medium ${isWishlisted(product.id) ? 'text-red-500' : 'text-gray-600'}`}
                       >
                         <Heart className="w-4 h-4" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} /> {isWishlisted(product.id) ? 'Remove' : 'Add to Wishlist'}
                       </button>
                       <button 
                         onClick={(e) => { e.preventDefault(); addToCart(product); }}
                         className="bg-[#7a2dd4] text-white px-5 py-2 rounded-full text-xs font-semibold shadow hover:bg-purple-800 transition-colors"
                       >
                         Add to Cart
                       </button>
                    </div>
                 </div>
                 
                 <div className="flex flex-col flex-1 text-center mt-auto">
                   <Link to={`/product/${product.id}`}>
                     <h3 className="text-gray-500 font-normal text-[13px] md:text-sm leading-snug mb-3 hover:text-primary cursor-pointer line-clamp-2">{product.title}</h3>
                   </Link>
                   <div className="flex justify-center items-center gap-2 mt-auto pointer-events-none">
                     <span className="text-[#7a2dd4] font-bold text-sm md:text-base">৳{product.price}</span>
                     {product.oldPrice && <span className="text-gray-400 line-through text-xs md:text-sm">৳{product.oldPrice}</span>}
                   </div>
                 </div>
               </SwiperSlide>
             ))}
          </Swiper>
        </div>
      </section>

      {/* Explore Our Offer */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-lg md:text-xl font-montserrat font-bold text-gray-900 mb-6">
            Explore Our Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Link to="/category/Makeup" className="relative flex flex-col justify-center p-6 md:p-8 overflow-hidden rounded-xl shadow-sm hover:shadow-[0_8px_25px_rgba(236,72,153,0.3)] transition-all duration-300 group bg-gradient-to-r from-pink-500 to-rose-400 min-h-[180px] md:min-h-[220px]">
              <div className="absolute right-0 top-0 w-2/3 md:w-1/2 h-full opacity-20 transform translate-x-1/4 group-hover:scale-110 transition-transform duration-700">
                <img src={demoImage('makeup', 'promo-1')} className="w-full h-full object-cover rounded-full mix-blend-overlay" alt="Bg" />
              </div>
              <div className="relative z-10 text-white max-w-[70%] md:max-w-[60%]">
                <span className="bg-white text-pink-500 text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wider mb-2 md:mb-3 inline-block shadow-sm">Flash Sale</span>
                <h3 className="text-xl md:text-3xl font-montserrat font-bold mb-1 md:mb-2 leading-tight drop-shadow-md">MARS Lips<br/>That Wow!</h3>
                <p className="text-xs md:text-sm opacity-90 mb-3 md:mb-4 drop-shadow-sm font-medium">Up to 40% off all shades</p>
                <span className="inline-flex items-center gap-1 font-bold text-xs md:text-sm underline underline-offset-4 hover:text-pink-100 transition-colors">Shop Now <ChevronRight className="w-4 h-4" /></span>
              </div>
            </Link>

            <Link to="/category/Skin%20Care" className="relative flex flex-col justify-center p-6 md:p-8 overflow-hidden rounded-xl shadow-sm hover:shadow-[0_8px_25px_rgba(245,158,11,0.3)] transition-all duration-300 group bg-gradient-to-r from-amber-400 to-orange-400 min-h-[180px] md:min-h-[220px]">
              <div className="absolute right-0 top-0 w-2/3 md:w-1/2 h-full opacity-20 transform translate-x-1/4 group-hover:scale-110 transition-transform duration-700">
                <img src={demoImage('skin', 'promo-2')} className="w-full h-full object-cover rounded-full mix-blend-overlay" alt="Bg" />
              </div>
              <div className="relative z-10 text-white max-w-[70%] md:max-w-[60%]">
                <span className="bg-white text-orange-500 text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wider mb-2 md:mb-3 inline-block shadow-sm">Special Offer</span>
                <h3 className="text-xl md:text-3xl font-montserrat font-bold mb-1 md:mb-2 leading-tight drop-shadow-md">Dot & Key<br/>Skincare</h3>
                <p className="text-xs md:text-sm opacity-90 mb-3 md:mb-4 drop-shadow-sm font-medium">Flat 50% Off Top Picks</p>
                <span className="inline-flex items-center gap-1 font-bold text-xs md:text-sm underline underline-offset-4 hover:text-orange-100 transition-colors">Explore <ChevronRight className="w-4 h-4" /></span>
              </div>
            </Link>

            <Link to="/sale/j-beauty" className="relative flex flex-col justify-center p-6 md:p-8 overflow-hidden rounded-xl shadow-sm hover:shadow-[0_8px_25px_rgba(20,184,166,0.3)] transition-all duration-300 group bg-gradient-to-r from-teal-400 to-emerald-400 min-h-[180px] md:min-h-[220px]">
              <div className="absolute right-0 top-0 w-2/3 md:w-1/2 h-full opacity-20 transform translate-x-1/4 group-hover:scale-110 transition-transform duration-700">
                <img src={demoImage('skin', 'promo-3')} className="w-full h-full object-cover rounded-full mix-blend-overlay" alt="Bg" />
              </div>
              <div className="relative z-10 text-white max-w-[70%] md:max-w-[60%]">
                <span className="bg-white text-teal-600 text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wider mb-2 md:mb-3 inline-block shadow-sm">New Arrival</span>
                <h3 className="text-xl md:text-3xl font-montserrat font-bold mb-1 md:mb-2 leading-tight drop-shadow-md">J-Beauty<br/>Secrets</h3>
                <p className="text-xs md:text-sm opacity-90 mb-3 md:mb-4 drop-shadow-sm font-medium">Buy 1 Get 1 Free Today</p>
                <span className="inline-flex items-center gap-1 font-bold text-xs md:text-sm underline underline-offset-4 hover:text-teal-100 transition-colors">Shop Now <ChevronRight className="w-4 h-4" /></span>
              </div>
            </Link>

            <Link to="/sale/k-beauty" className="relative flex flex-col justify-center p-6 md:p-8 overflow-hidden rounded-xl shadow-sm hover:shadow-[0_8px_25px_rgba(99,102,241,0.3)] transition-all duration-300 group bg-gradient-to-r from-indigo-500 to-violet-500 min-h-[180px] md:min-h-[220px]">
              <div className="absolute right-0 top-0 w-2/3 md:w-1/2 h-full opacity-20 transform translate-x-1/4 group-hover:scale-110 transition-transform duration-700">
                <img src={demoImage('skin', 'promo-4')} className="w-full h-full object-cover rounded-full mix-blend-overlay" alt="Bg" />
              </div>
              <div className="relative z-10 text-white max-w-[70%] md:max-w-[60%]">
                <span className="bg-white text-indigo-600 text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wider mb-2 md:mb-3 inline-block shadow-sm">Mega Sale</span>
                <h3 className="text-xl md:text-3xl font-montserrat font-bold mb-1 md:mb-2 leading-tight drop-shadow-md">K-Beauty<br/>Bestsellers</h3>
                <p className="text-xs md:text-sm opacity-90 mb-3 md:mb-4 drop-shadow-sm font-medium">Starting at just ৳499</p>
                <span className="inline-flex items-center gap-1 font-bold text-xs md:text-sm underline underline-offset-4 hover:text-indigo-100 transition-colors">Grab Deal <ChevronRight className="w-4 h-4" /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop By Skin Concern */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-xl md:text-2xl font-montserrat font-bold text-gray-900 mb-8">
            Shop By Skin Concern
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5">
            {skinConcerns.map((concern, idx) => (
              <Link key={idx} to={`/category/${encodeURIComponent(concern.id)}`} className="relative bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all h-[232px] md:h-[240px] flex flex-col overflow-hidden group hover:-translate-y-1">
                {/* The angled background */}
                <div 
                  className="w-full h-36 bg-gradient-to-b from-[#eedabe] to-[#fcf6ee] absolute top-0 left-0 z-0 transition-colors group-hover:from-[#e3cbab]" 
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}
                ></div>
                
                {/* Content */}
                <div className="z-10 flex flex-col items-center w-full h-full pt-4 px-3">
                  {/* Top Header */}
                  <span className="text-[#d11175] font-serif font-bold text-sm md:text-[15px] tracking-wide uppercase drop-shadow-sm text-center leading-tight h-10 w-full flex items-center justify-center">
                    {concern.topTitle}
                  </span>
                  
                  {/* Circular Image */}
                  <div className="w-[80px] h-[80px] md:w-[90px] md:h-[90px] rounded-full border-4 border-white shadow-sm overflow-hidden mt-1 bg-gray-50 z-20">
                    <img src={concern.image} alt={concern.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  
                  {/* Bottom Text */}
                  <div className="mt-auto w-full pb-3 md:pb-4 text-center md:text-left min-h-[68px]">
                    <h4 className="text-[#a24892] font-semibold text-[13px] md:text-sm">{concern.title}</h4>
                    <p className="text-gray-500 text-[10px] md:text-[11px] leading-snug mt-1">{concern.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* Features / Benefits */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <ShieldCheck className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-montserrat font-bold text-secondary mb-1">Authentic Products</h4>
              <p className="text-xs text-textMuted">100% Genuine Brands</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Truck className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-montserrat font-bold text-secondary mb-1">Fast Delivery</h4>
              <p className="text-xs text-textMuted">All Over Bangladesh</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <RotateCcw className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-montserrat font-bold text-secondary mb-1">Easy Returns</h4>
              <p className="text-xs text-textMuted">7 Days Return Policy</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Headphones className="w-10 h-10 text-primary mb-4" />
              <h4 className="font-montserrat font-bold text-secondary mb-1">24/7 Support</h4>
              <p className="text-xs text-textMuted">Dedicated Help Center</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

