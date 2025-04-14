import { Routes } from '@angular/router';

export const routes: Routes = [{ path: '', redirectTo: 'products', pathMatch: 'full' },
    { 
      path: 'products', 
      loadComponent: () => import('./features/product-list/product-list.component')
        .then(m => m.ProductListComponent)
    },
    { 
      path: 'products/:id', 
      loadComponent: () => import('./features/product-details/product-details.component')
        .then(m => m.ProductDetailsComponent)
    },
    { 
      path: 'cart', 
      loadComponent: () => import('./features/cart/cart.component')
        .then(m => m.CartComponent)
    },
    { 
      path: 'dashboard', 
      loadComponent: () => import('./features/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
    },
    { path: '**', redirectTo: 'dashboard' }];
