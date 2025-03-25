export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  isPopular: boolean;
  createdAt: string;
}

export interface ProductData extends Omit<Product, 'id'> {
  id?: string;
} 