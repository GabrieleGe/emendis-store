import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemComponent } from './cart-item.component';
import { mockCartItem } from '../../testing/carts';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.item = mockCartItem;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the item title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="item-title"]'
    );
    expect(titleElement.textContent).toBe(mockCartItem.title);
  });

  it('should display the correct image', () => {
    const imgElement: HTMLImageElement = fixture.nativeElement.querySelector(
      '[data-testid="item-image"]'
    );
    expect(imgElement.src).toContain(mockCartItem.image);
  });

  it('should emit decreaseQty event when decrease button is clicked', () => {
    spyOn(component.decreaseQty, 'emit');
    const decreaseButton: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="decrease-button"]'
    );
    if (decreaseButton) {
      decreaseButton.click();
      expect(component.decreaseQty.emit).toHaveBeenCalledWith(mockCartItem.id);
    } else {
      fail('Decrease button not found');
    }
  });

  it('should emit increaseQty event when increase button is clicked', () => {
    spyOn(component.increaseQty, 'emit');
    const increaseButton: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="increase-button"]'
    );
    if (increaseButton) {
      increaseButton.click();
      expect(component.increaseQty.emit).toHaveBeenCalledWith(mockCartItem.id);
    } else {
      fail('Increase button not found');
    }
  });

  it('should emit remove event when remove button is clicked', () => {
    spyOn(component.remove, 'emit');
    const removeButton: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="remove-button"]'
    );
    if (removeButton) {
      removeButton.click();
      expect(component.remove.emit).toHaveBeenCalledWith(mockCartItem.id);
    } else {
      fail('Remove button not found');
    }
  });

  it('should display the quantity', () => {
    const quantityElement: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="quantity"]'
    );
    expect(quantityElement.textContent).toBe(mockCartItem.quantity.toString());
  });

  it('should conditionally display buttons when isPreview is false', () => {
    component.isPreview = false;
    fixture.detectChanges(); // Make sure the DOM is updated

    const decreaseButton: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="decrease-button"]'
    );
    const increaseButton: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="increase-button"]'
    );
    const removeButton: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="remove-button"]'
    );

    expect(decreaseButton).toBeTruthy();
    expect(increaseButton).toBeTruthy();
    expect(removeButton).toBeTruthy();
  });

  it('should NOT display buttons when isPreview is true', () => {
    component.isPreview = true;
    fixture.detectChanges();

    const decreaseButton: HTMLElement = fixture.nativeElement.querySelector('[data-testid="decrease-button"]');
    const increaseButton: HTMLElement = fixture.nativeElement.querySelector('[data-testid="increase-button"]');
    const removeButton: HTMLElement = fixture.nativeElement.querySelector('[data-testid="remove-button"]');

    expect(decreaseButton).toBeNull();
    expect(increaseButton).toBeNull();
    expect(removeButton).toBeNull();
  });
});
