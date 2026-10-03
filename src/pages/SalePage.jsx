import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronRight, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const discountOf = (p) => (p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0);

const SALES = {
  'k-beauty': {
    title: 'K-Beauty Sale',
    subtitle: 'Korean skincare favourites from COSRX, LANEIGE and Medicube',
    gradient: 'from-[#FF007F] to-[#ff5fae]',
    filter: (p) => ['cosrx', 'laneige', 'medicube'].includes((p.brand || '').toLowerCase()),
  },
  clearance: {
    title: 'Clearance Sale',
    subtitle: 'Biggest price drops across the store. 30% off or more, while stock lasts',
    gradient: 'from-[#D30000] to-[#ff5a3c]',
    filter: (p) => discountOf(p) >= 30,
  },
  'j-beauty': {
    title: 'J-Beauty Sale',
    subtitle: 'Light, layered skincare rituals: cleansers, essences, toners, sunscreens and masks',
    gradient: 'from-[#7800D7] to-[#a855f7]',
    filter: (p) => p.category === 'Skin Care' && /cleanser|essence|toner|sunscreen|mask|serum/i.test(p.title),
  },
};

const SORTS = {
  discount: { label: 'Biggest discount', fn: (a, b) => discountOf(b) - discountOf(a) },
  low: { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  high: { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  rating: { label: 'Top rated', fn: (a, b) => Number(b.rating) - Number(a.rating) },
};

const SalePage = () => {
  const { saleType } = useParams();
  const sale = SALES[saleType];
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [sort, setSort] = useState('discount');

  const list = useMemo(
    () => (sale ? products.filter(sale.filter).sort(SORTS[sort].fn) : []),
    [sale, sort],
  );

  if (!sale) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">We could not find that sale.</p>
        <Link to="/" className="text-primary font-medium hover:underline">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary flex items-center gap-1"><ArrowLeft className="w-4 h-4" /> Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary font-medium">{sale.title}</span>
        </div>
      </div>

      <section className={`bg-gradient-to-r ${sale.gradient} text-white`}>
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-4xl font-montserrat font-bold !text-white">{sale.title}</h1>
          <p className="mt-2 text-white/90 max-w-2xl text-sm md:text-lg">{sale.subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {Object.entries(SALES).map(([key, s]) => (
              <Link key={key} to={`/sale/${key}`} aria-current={key === saleType ? 'page' : undefined}
                className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-colors ${key === saleType ? 'bg-white text-secondary' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between gap-3 mb-5">
          <p className="text-sm text-gray-500">{list.length} products</p>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hidden sm:inline">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-secondary focus:outline-none focus:border-primary">
              {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
            </select>
          </label>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-400 text-lg mb-4">No products in this sale right now.</p>
            <Link to="/" className="text-primary font-medium hover:underline">← Back to Home</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {list.map((product) => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100 flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img src={product.image} alt={product.title} loading="lazy" className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  {discountOf(product) > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">-{discountOf(product)}%</div>
                  )}
                  <button onClick={() => toggleWishlist(product)} aria-label="Toggle wishlist"
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${isWishlisted(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}>
                    <Heart className="w-4 h-4" fill={isWishlisted(product.id) ? 'white' : 'none'} />
                  </button>
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium text-secondary leading-snug line-clamp-2 mb-2 hover:text-primary transition-colors">{product.title}</h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex flex-col mb-3 mt-auto">
                    {product.oldPrice && <span className="text-xs text-gray-400 line-through">৳{product.oldPrice}</span>}
                    <span className="text-lg font-bold text-primary">৳{product.price}</span>
                  </div>
                  <button onClick={() => addToCart(product)}
                    className="w-full bg-primary hover:bg-primaryDark text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalePage;
