import { CartItem } from "../models/product.model";

export const mockCartItem: CartItem = {
  id: 1,
  title: 'Test Product',
  price: 13.5,
  description: 'Test Description',
  image: 'test.jpg',
  category: 'electronics',
  rating: { rate: 4.5, count: 120 },
  quantity: 4
};