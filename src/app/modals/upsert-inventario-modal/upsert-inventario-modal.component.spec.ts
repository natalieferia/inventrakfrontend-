import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertInventarioModalComponent } from './upsert-inventario-modal.component';

describe('UpsertInventarioModalComponent', () => {
  let component: UpsertInventarioModalComponent;
  let fixture: ComponentFixture<UpsertInventarioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertInventarioModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertInventarioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
