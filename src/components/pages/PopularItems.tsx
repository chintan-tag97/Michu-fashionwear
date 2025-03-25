import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { addToCart } from '../../utils/cartUtils';

const PopularItems = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    try {
      setAddingToCart(product.id);
      await addToCart({
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.imageUrl
      });
      // Show success message or update UI
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-rose-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-rose-800 mb-4">
            All Popular Products
          </h1>
          <p className="text-rose-600 text-lg max-w-2xl mx-auto">
            Explore our complete collection of fashion pieces
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl">
                <Link to={`/products/${product.id}`}>
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                   
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-xl font-serif font-bold mb-2 text-rose-800 group-hover:text-rose-900 transition-colors duration-200">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-rose-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-rose-900">
                        ${product.price}
                      </span>
                      
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product.id}
                      className={`px-4 py-2 bg-rose-900 text-white rounded-full text-sm font-medium transition-all duration-200 transform hover:-translate-y-1 ${
                        addingToCart === product.id
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-rose-800'
                      }`}
                    >
                      {addingToCart === product.id ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularItems;