import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { CartItem } from "../types/index";


export const addToCart = async (item: Omit<CartItem, "id">) => {
  try {
    const cartCollection = collection(db, "cart");
    const q = query(
      cartCollection,
      where("name", "==", item.name)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const existingItem = querySnapshot.docs[0];
      const currentQuantity = existingItem.data().quantity;
      await updateDoc(doc(db, "cart", existingItem.id), {
        quantity: currentQuantity + item.quantity
      });
    } else {
      await addDoc(cartCollection, item);
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const getCartItemCount = async (): Promise<number> => {
  try {
    const cartCollection = collection(db, "cart");
    const cartSnapshot = await getDocs(cartCollection);
    return cartSnapshot.size;
  } catch (error) {
    console.error("Error getting cart count:", error);
    return 0;
  }
}; 