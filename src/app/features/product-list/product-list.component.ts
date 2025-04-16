import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../shared/models/product.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProductListComponent implements OnInit {
  private searchTermSignal = signal('');
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  filteredProducts = computed(() => {
    const searchTerm = this.searchTermSignal().toLowerCase();
    const products = this.productService.products();

    if (!searchTerm) {
      return products;
    }

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  });

  ngOnInit(): void {
    this.productService.fetchProducts().pipe(
      take(1)
    ).subscribe();
  }

  updateSearchTerm(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTermSignal.set(value);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
