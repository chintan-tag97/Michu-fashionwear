import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { OrderDetails } from '../../../types/index';
import FormComponent from '../../shared/FormComponent';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, loading, error } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    fullName: '',
    address: '',
    pincode: '',
    phoneNumber: '',
  });
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderChange = (name: string, value: any) => {
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);

    try {
      // Create order in Firebase
      await addDoc(collection(db, 'orders'), {
        ...orderDetails,
        items: cartItems,
        total,
        orderDate: new Date(),
        status: 'pending'
      });

      // Clear cart after successful order
      await clearCart();
      setOrderSuccess(true);
      setShowOrderForm(false);
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderError('Failed to place order. Please try again.');
    }
  };

  const orderFormFields = [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      value: orderDetails.fullName
    },
    {
      name: 'address',
      label: 'Delivery Address',
      type: 'textarea',
      value: orderDetails.address,
      rows: 3
    },
    {
      name: 'pincode',
      label: 'Pincode',
      type: 'text',
      value: orderDetails.pincode
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'tel',
      value: orderDetails.phoneNumber
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg  p-6 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-4">Thank you for your order.</p>
            <Link
              to="/"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg  ">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <div className="mt-2 flex items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 border border-gray-300 rounded-l"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 border border-gray-300 rounded-r"
                        >
                          +
                        </button>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                    <div className="flex gap-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-6 py-2  bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                    >
                      Remove
                    </button>
                    <button 
                    onClick={() => setShowOrderForm(true)}
                    className="px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
                  >
                    Place Order
                  </button>
                  </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-gray-900">Total</p>
                    <p className="text-sm text-gray-500">
                      {cartItems.length} items
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">₹{total}</div>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => clearCart()}
                    className="px-4 py-2 text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear Cart
                  </button>
                 
                </div>
              </div>
            </>
          )}
        </div>

        {showOrderForm && (
          <div className="fixed inset-0 bg-rose-900 opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Order Details</h3>
                <button
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <FormComponent
                fields={orderFormFields}
                onSubmit={handleOrderSubmit}
                onChange={handleOrderChange}
                submitButtonText="Place Order"
                error={orderError}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default Cart; 