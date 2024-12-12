import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertProveedorModalComponent } from './upsert-proveedor-modal.component';

describe('UpsertProveedorModalComponent', () => {
  let component: UpsertProveedorModalComponent;
  let fixture: ComponentFixture<UpsertProveedorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertProveedorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertProveedorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
