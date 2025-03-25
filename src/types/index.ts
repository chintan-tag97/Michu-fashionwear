export interface SliderContent {
  url: string;
  alt: string;
  title: string;
  description: string;
}


export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}


export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderDetails {
  fullName: string;
  address: string;
  pincode: string;
  phoneNumber: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  isPopular: boolean;
  createdAt: string;
  categoriesid: string;
}

export interface ProductData extends Omit<Product, 'id'> {
  id?: string;
} 