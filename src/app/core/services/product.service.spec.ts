import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products and update signal', () => {
    const mockProducts = [
      { 
        id: 1, 
        title: 'Test Product', 
        price: 13.5, 
        description: 'Test Description',
        image: 'test.jpg',
        category: 'electronics',
        rating: { rate: 4.5, count: 120 }
      }
    ];

    service.fetchProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
      expect(service.products()).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should get product by id', () => {
    const mockProduct = { 
      id: 1, 
      title: 'Test Product', 
      price: 13.5, 
      description: 'Test Description',
      image: 'test.jpg',
      category: 'electronics',
      rating: { rate: 4.5, count: 120 }
    };

    service.getProductById(1).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });
});