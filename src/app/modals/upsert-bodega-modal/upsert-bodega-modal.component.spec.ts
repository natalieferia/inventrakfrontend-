import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertBodegaModalComponent } from './upsert-bodega-modal.component';

describe('UpsertBodegaModalComponent', () => {
  let component: UpsertBodegaModalComponent;
  let fixture: ComponentFixture<UpsertBodegaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertBodegaModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertBodegaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
