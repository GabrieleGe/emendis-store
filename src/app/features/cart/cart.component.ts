import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { CartItemComponent } from '../../shared/components/cart-item/cart-item.component';
import { MatButtonModule } from '@angular/material/button';
import { CartItem } from '../../shared/models/product.model';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CartItemComponent, MatButtonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  @Input() isPreview = false;
  cartItems: CartItem[] = [];
  totalPrice = 0;
  totalCount = 0;
  private cartSubscription!: Subscription;

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      this.totalCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  addToCart(productId: number): void {
    const product = this.cartItems.find((item) => item.id === productId);
    if (product) {
      this.cartService.addToCart(product);
    }
  }

  removeOneFromCart(productId: number): void {
    this.cartService.removeOneFromCart(productId);
  }

  removeAllFromCart(productId: number): void {
    this.cartService.removeAllFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
