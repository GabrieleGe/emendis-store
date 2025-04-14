import { computed, Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../../shared/models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>(this.loadCartFromStorage());
  cartCountUniques = computed(() => this.cartItems().length);
  cartCount = computed(() => this.cartItems().reduce((count, item) => count + item.quantity, 0));

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  cartItems$ = this.cartSubject.asObservable();
  
  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'cartItems') {
        const newItems = JSON.parse(event.newValue || '[]');
        this.cartItems.set(newItems);
        this.cartSubject.next(newItems);
      }
    });
  }

  private loadCartFromStorage(): CartItem[] {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error('Error loading cart from storage', e);
      return [];
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem('cartItems', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  }
  
  addToCart(product: Product): void {
    this.cartItems.update(items => {
      const existingItemIndex = items.findIndex(item => item.id === product.id);
      
      let newItems;
      if (existingItemIndex !== -1) {
        newItems = [...items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1
        };
      } else {
        newItems = [...items, { ...product, quantity: 1 }];
      }
      
      this.saveCartToStorage(newItems);
      this.cartSubject.next(newItems);
      return newItems;
    });
  }
  
  removeOneFromCart(productId: number): void {
    this.cartItems.update(items => {
      const existingItemIndex = items.findIndex(item => item.id === productId);
      
      if (existingItemIndex === -1) return items;
      
      const newItems = [...items];
      
      if (newItems[existingItemIndex].quantity > 1) {
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity - 1
        };
      } else {
        newItems.splice(existingItemIndex, 1);
      }
      
      this.saveCartToStorage(newItems);
      this.cartSubject.next(newItems); 
      return newItems;
    });
  }
  
  removeAllFromCart(productId: number): void {
    this.cartItems.update(items => {
      const newItems = items.filter(item => item.id !== productId);
      this.saveCartToStorage(newItems);
      this.cartSubject.next(newItems);
      return newItems;
    });
  }
  
  clearCart(): void {
    const emptyCart: CartItem[] = [];
    this.cartItems.set(emptyCart);
    this.saveCartToStorage(emptyCart);
    this.cartSubject.next(emptyCart); 
  }

}