import { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy, writeBatch } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import type { Product } from '../../types/index';
import AddProduct from './AddProduct';

const ProductManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const fetchProducts = async () => {
    try {
      setError(null);
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>)
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setError(null);
        await deleteDoc(doc(db, 'products', productId));
        await fetchProducts(); // Refresh the list
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product. Please try again.');
      }
    }
  };

  const handleClearAllProducts = async () => {
    if (!window.confirm('⚠️ WARNING: This will permanently delete ALL products. Are you absolutely sure?')) {
      return;
    }
    if (!window.confirm('Please confirm again that you want to delete all products. This action CANNOT be undone!')) {
      return;
    }

    try {
      setIsClearing(true);
      setError(null);
      const batch = writeBatch(db);
      const productsRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsRef);
      
      if (querySnapshot.empty) {
        alert('No products to delete.');
        return;
      }

      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      await fetchProducts(); // Refresh the list
      alert(`Successfully deleted ${querySnapshot.size} products.`);
    } catch (error) {
      console.error('Error deleting all products:', error);
      setError('Failed to clear products. Please try again.');
    } finally {
      setIsClearing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading products... </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
            <p className="text-sm text-gray-600 mt-1">
              Total Products: {products.length}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleClearAllProducts}
              disabled={isClearing || products.length === 0}
              className={`px-4 py-2 text-white rounded-md transition-colors flex items-center gap-2
                ${isClearing || products.length === 0 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isClearing ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Clearing...
                </>
              ) : (
                'Clear All Products'
              )}
            </button>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {showAddForm ? 'Cancel' : 'Add New Product'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            {error}
          </div>
        )}

        {showAddForm && (
          <div className="mb-8">
            <AddProduct onProductAdded={fetchProducts} />
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Popular
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product: Product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-16 w-16 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {product.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">₹{product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.isPopular ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center bg-white rounded-lg shadow-sm p-8 mt-8">
            <p className="text-gray-600 mb-4">
              No products available.
            </p>
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Click here to add your first product
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement; 