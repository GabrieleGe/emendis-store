import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule, MatButtonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Input() isPreview = false;
  @Output() remove = new EventEmitter<number>();
  @Output() decreaseQty = new EventEmitter<number>();
  @Output() increaseQty = new EventEmitter<number>();

  decreaseQuantity(): void {
    this.decreaseQty.emit(this.item.id);
  }

  increaseQuantity(): void {
    this.increaseQty.emit(this.item.id);
  }

  removeAllItems(): void {
    this.remove.emit(this.item.id);
  }
}
