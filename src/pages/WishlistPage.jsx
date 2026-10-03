import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-montserrat font-bold text-secondary mb-2">My Wishlist</h1>
        <p className="text-gray-500 mb-8">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-500 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6">Save items you love and come back to them anytime.</p>
            <Link to="/" className="bg-primary hover:bg-primaryDark text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {wishlistItems.map(product => (
              <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-gray-100 flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  {product.oldPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                      -{(100 - (product.price / product.oldPrice) * 100).toFixed(0)}%
                    </div>
                  )}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow hover:bg-red-600 transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
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
                    onClick={() => { addToCart(product); }}
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
  );
};

export default WishlistPage;
