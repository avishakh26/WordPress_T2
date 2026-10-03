import Header from './Header';
import MobileBottomNav from './MobileBottomNav';
import Footer from './Footer';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CheckoutModal from '../cart/CheckoutModal';

const FloatingCart = () => {
  const { cartItems, setIsCartOpen } = useCart();
  
  return (
    <button 
      onClick={() => setIsCartOpen(true)}
      className="hidden lg:flex fixed bottom-10 right-6 bg-white p-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-all hover:scale-110 z-[100] items-center justify-center cursor-pointer group" 
      title="Open Cart"
    >
      <ShoppingCart className="w-7 h-7 md:w-8 md:h-8 text-primary group-hover:text-primaryDark transition-colors" />
      {cartItems.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs md:text-sm font-bold w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shadow-md border-2 border-white">
          {cartItems.length}
        </span>
      )}
    </button>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 text-textMain font-sans antialiased min-h-screen flex flex-col pb-16 lg:pb-0 overflow-x-hidden w-full max-w-[100vw]">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
      <FloatingCart />
      <CheckoutModal />
    </div>
  );
};

export default MainLayout;
