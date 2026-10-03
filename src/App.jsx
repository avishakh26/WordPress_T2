import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import BrandPage from './pages/BrandPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import WishlistPage from './pages/WishlistPage';
import SalePage from './pages/SalePage';
import MainLayout from './components/layout/MainLayout';
import { SearchProvider } from './context/SearchContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import CartSidebar from './components/cart/CartSidebar';

// Every page change starts at the top of the new page instead of keeping the old scroll position.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <MainLayout>
              <CartSidebar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/brand/:brandName" element={<BrandPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/sale/:saleType" element={<SalePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
              </Routes>
            </MainLayout>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
