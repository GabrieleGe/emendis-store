import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = 'https://fakestoreapi.com/products';
  private productsSignal = signal<Product[]>([]);
  readonly products = this.productsSignal.asReadonly();

  constructor(private http: HttpClient) {}

  fetchProducts() {
    return this.http.get<Product[]>(this.API_URL).pipe(
      tap((products) => {
        this.productsSignal.set(products);
      })
    );
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.API_URL}/${id}`);
  }
}
