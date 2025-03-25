import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const PopularProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(
          productsRef,
          where('isPopular', '==', true),
          limit(7)
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, 'id'>)
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

  if (loading) {
    return (
      <section className="py-16 bg-gray-900 text-center">
        <p className="text-xl text-gray-400">Loading products...</p>
      </section>
    );
  }

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Popular Products</h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="relative flex justify-center items-center min-h-[600px] max-w-[1400px] mx-auto perspective-1000">
          {products.map((product, index) => {
            const offset = index - activeIndex;
            const isActive = index === activeIndex;
            
            return (
              <div
                key={product.id}
                className={`absolute transition-all duration-700 ease-out cursor-pointer
                  ${isActive ? 'z-30' : 'z-20 hover:scale-105'}
                  ${Math.abs(offset) <= 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                style={{
                  transform: `
                    translateX(${offset * 120}px)
                    scale(${isActive ? 1 : 0.8})
                    rotateY(${offset * -5}deg)
                    translateZ(${isActive ? 0 : -100}px)
                  `,
                  zIndex: products.length - Math.abs(offset)
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className="block group">
                  <div className="relative overflow-hidden rounded-xl shadow-2xl transition-all duration-500">
                    <div className="relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className={`w-[350px] h-[450px] object-cover transition-all duration-700
                          ${isActive ? '' : 'grayscale brightness-75'} 
                          group-hover:grayscale-0 group-hover:brightness-100`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold text-gray-800 text-center mb-2">{product.name}</h3>
                        {isActive && (
                          <div className="flex justify-center items-center gap-2">
                            <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium animate-pulse">
                              UP TO 50% OFF
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {isActive && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur p-2 rounded-full shadow-lg animate-bounce">
                          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-black scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
