import { of } from 'rxjs';
import { Product } from '../models/product.model';
import { signal } from '@angular/core';

export const productMock: Product = {
  id: 1,
  title: 'Test Product',
  price: 13.5,
  description: 'Test Description',
  image: 'test.jpg',
  category: 'electronics',
  rating: { rate: 4.5, count: 120 },
};

export class MockProductService {
  private productsSignal = signal<Product[]>([productMock]);
  readonly products = this.productsSignal.asReadonly();

  getProductById() {
    return of(productMock);
  }

  fetchProducts() {
    return of([productMock]);
  }
}
