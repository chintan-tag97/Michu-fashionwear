import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart items from Firebase
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const cartRef = collection(db, 'cart');
      const querySnapshot = await getDocs(cartRef);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as CartItem[];
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (product: any) => {
    try {
      setError(null);
      // Check if product already exists in cart
      const existingItem = cartItems.find(item => item.productId === product.id);
      
      if (existingItem) {
        // Update quantity in Firebase
        const cartRef = collection(db, 'cart');
        const q = query(cartRef, where('productId', '==', product.id));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const docRef = doc(db, 'cart', querySnapshot.docs[0].id);
          await deleteDoc(docRef);
          await addDoc(collection(db, 'cart'), {
            productId: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: existingItem.quantity + 1
          });
        }
      } else {
        // Add new item to Firebase
        await addDoc(collection(db, 'cart'), {
          productId: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1
        });
      }
      
      // Refresh cart items
      await fetchCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart');
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setError(null);
      await deleteDoc(doc(db, 'cart', itemId));
      await fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
      setError('Failed to remove item from cart');
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      setError(null);
      if (newQuantity < 1) return;

      const docRef = doc(db, 'cart', itemId);
      await updateDoc(docRef, { quantity: newQuantity });
      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError('Failed to update quantity');
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      const cartRef = collection(db, 'cart');
      const querySnapshot = await getDocs(cartRef);
      
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      setError('Failed to clear cart');
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart, 
      loading, 
      error 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 