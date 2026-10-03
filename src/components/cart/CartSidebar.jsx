import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, setIsCheckoutOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-[200] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[210] shadow-2xl transform transition-transform duration-300 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" /> 
            Your Cart ({cartItems.length})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                <div className="flex-1">
                  <h3 className="font-medium text-sm line-clamp-2 text-gray-800">{item.title}</h3>
                  <div className="text-primary font-bold mt-1">৳{item.price}</div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-white rounded shadow-sm transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-white rounded shadow-sm transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between mb-4 text-lg font-bold">
              <span>Subtotal</span>
              <span className="text-primary">৳{cartTotal}</span>
            </div>
            <button 
              onClick={handleCheckoutClick}
              className="w-full bg-primary hover:bg-primaryDark text-white py-3 rounded-xl font-bold transition-colors"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
