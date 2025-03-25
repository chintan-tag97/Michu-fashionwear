import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/layout/Home'
import Products from './components/home/PopularProducts';
import Categories from './components/home/Categories';
import CategoryItems from './components/pages/CategoryItems';
import PopularItems from './components/pages/PopularItems';
import ProductManagement from './components/admin/ProductManagement';
import Cart from './components/cart/Cart';
import { CartProvider } from './components/cart/CartContext';
import Hero from './components/home/Hero';

const App = () => {
  

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/categoryitems" element={<CategoryItems />} />
          <Route path="/popularitems" element={<PopularItems />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/hero" element={<Hero />} />

          <Route path="/admin" element={<ProductManagement />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App
