export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: ProductRating;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  username: string;
}

export type Theme = 'light' | 'dark';

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';