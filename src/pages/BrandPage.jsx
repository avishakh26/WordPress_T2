import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ChevronRight, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import FilterPanel from '../components/layout/FilterPanel';

const BrandPage = () => {
  const { brandName } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const decodedBrand = decodeURIComponent(brandName);
  
  // Filter products by brand, ignoring case for robustness
  const brandProducts = products.filter(
    p => p.brand && p.brand.toLowerCase() === decodedBrand.toLowerCase()
  );

  // All unique brands for sidebar
  const allBrands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary font-medium capitalize">{decodedBrand}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Filter: sidebar on desktop, drawer on phones */}
          <FilterPanel
            title="All Brands"
            activeLabel={decodedBrand}
            items={allBrands.map((brand) => ({
              label: brand,
              to: `/brand/${encodeURIComponent(brand.toLowerCase())}`,
              count: products.filter((p) => p.brand === brand).length,
              active: brand.toLowerCase() === decodedBrand.toLowerCase(),
            }))}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-montserrat font-bold text-secondary capitalize">
                {decodedBrand}
                <span className="text-base font-normal text-gray-400 ml-2">({brandProducts.length} products)</span>
              </h1>
            </div>

            {brandProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-400 text-lg mb-4">No products found for this brand.</p>
                <Link to="/" className="text-primary font-medium hover:underline">← Back to Home</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                {brandProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100 flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      {/* Discount badge */}
                      {product.oldPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded z-10">
                          -{(100 - (product.price / product.oldPrice) * 100).toFixed(0)}%
                        </div>
                      )}
                      {/* Wishlist button */}
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all z-10 ${
                          isWishlisted(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={isWishlisted(product.id) ? 'white' : 'none'} />
                      </button>
                    </div>

                    <div className="p-3 flex flex-col flex-1">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="text-sm font-medium text-secondary leading-snug line-clamp-2 mb-2 hover:text-primary transition-colors">
                          {product.title}
                        </h3>
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
                      <button
                         onClick={() => addToCart(product)}
                         className="w-full bg-primary hover:bg-primaryDark text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                         <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
