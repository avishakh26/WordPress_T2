import { Home, Grid, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const MobileBottomNav = () => {
  const { cartItems, setIsCartOpen } = useCart();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40 flex justify-around items-center py-3">
      <Link to="/" className="flex flex-col items-center text-primary">
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-medium mt-1">Home</span>
      </Link>
      <button className="flex flex-col items-center text-textMuted hover:text-primary">
        <Grid className="w-6 h-6" />
        <span className="text-[10px] font-medium mt-1">Categories</span>
      </button>
      <button 
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center text-textMuted hover:text-primary relative"
      >
        <ShoppingCart className="w-6 h-6" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
        <span className="text-[10px] font-medium mt-1">Cart</span>
      </button>
      <button className="flex flex-col items-center text-textMuted hover:text-primary">
        <User className="w-6 h-6" />
        <span className="text-[10px] font-medium mt-1">Account</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;
