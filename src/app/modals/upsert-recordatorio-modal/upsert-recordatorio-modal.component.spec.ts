import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertRecordatorioModalComponent } from './upsert-recordatorio-modal.component';

describe('UpsertRecordatorioModalComponent', () => {
  let component: UpsertRecordatorioModalComponent;
  let fixture: ComponentFixture<UpsertRecordatorioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertRecordatorioModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertRecordatorioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
