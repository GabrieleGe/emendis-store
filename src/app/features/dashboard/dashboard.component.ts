import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service'; 
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CartComponent } from '../cart/cart.component';
import { Product } from '../../shared/models/product.model';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, ProductCardComponent, CartComponent, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
