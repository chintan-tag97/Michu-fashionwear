import {  useNavigate } from 'react-router-dom';
import { Product } from '../../../types';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useCart } from '../cart/CartContext';
import ProductCard from '../../shared/ProductCard';
import Header from '../home/Header';

const categories = [
  { id: 'women', name: 'Women' },
  { id: 'men', name: 'Men' },
  { id: 'kids', name: 'Kids' },
  { id: 'accessories', name: 'Accessories' }
];

const CategoryItems = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const productsData = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        
        console.log('=== All Products Data ===');
        console.log('Total products:', productsData.length);
        productsData.forEach(product => {
          console.log(`Product: ${product.name}`);
          console.log(`- ID: ${product.id}`);
          console.log(`- Category ID: ${product.categoriesid}`);
          console.log(`- Full product data:`, product);
          console.log('-------------------');
        });
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => {
        console.log('=== Filtering Product ===');
        console.log('Product name:', product.name);
        console.log('Product category:', product.categoriesid);
        console.log('Selected category:', selectedCategory);
        console.log('Category match:', product.categoriesid?.toLowerCase() === selectedCategory.toLowerCase());
        console.log('-------------------');
        return product.categoriesid?.toLowerCase() === selectedCategory.toLowerCase();
      });

  console.log('=== Current State ===');
  console.log('Selected Category:', selectedCategory);
  console.log('Total Products:', products.length);
  console.log('Filtered Products:', filteredProducts.length);
  console.log('Filtered Products Data:', filteredProducts);

  const handleAddToCart = (product: Product) => {
    alert('Product added to cart successfully!');
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-rose-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-rose-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <div className="min-h-screen bg-rose-50 py-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-col sm:flex-row gap-8">
      {/* Vertical Navigation */}
      <div className="w-full sm:w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-serif font-bold text-rose-800 mb-4">
            Categories
          </h3>
          <nav className="space-y-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-rose-800 text-white'
                  : 'text-rose-600 hover:bg-rose-100'
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  console.log('Category clicked:', category.id);
                  setSelectedCategory(category.id);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-rose-800 text-white'
                    : 'text-rose-600 hover:bg-rose-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-rose-800 mb-4">
            {selectedCategory === 'all'
              ? 'All Categories'
              : categories.find((c) => c.id === selectedCategory)?.name}
          </h1>
          <p className="text-rose-600 text-lg max-w-2xl mx-auto">
            Explore our collection of{' '}
            {selectedCategory === 'all'
              ? 'products'
              : categories.find((c) => c.id === selectedCategory)?.name.toLowerCase()}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-rose-600 text-lg">
                No products found in this category.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                variant="default"
              />
            ))
          )}
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default CategoryItems;