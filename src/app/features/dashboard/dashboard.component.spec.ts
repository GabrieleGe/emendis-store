import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from '../../core/services/product.service';
import { MockProductService } from '../../shared/testing/products';
import { CartService } from '../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClientTesting(),
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        CartService,
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => '5' }),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: () => '5',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
