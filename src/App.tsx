import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Products from './components/user/home/PopularProducts';
import Categories from './components/user/home/Categories';
import CategoryItems from './components/user/pages/CategoryItems';
import PopularItems from './components/user/pages/PopularItems';
import ProductManagement from './components/admin/ProductManagement';
import Cart from './components/user/cart/Cart';
import { CartProvider } from './components/user/cart/CartContext';
import Home from './components/user/layout/Home';

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
          <Route path="/admin" element={<ProductManagement />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App
