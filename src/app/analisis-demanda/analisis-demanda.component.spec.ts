import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisDemandaComponent } from './analisis-demanda.component';

describe('AnalisisDemandaComponent', () => {
  let component: AnalisisDemandaComponent;
  let fixture: ComponentFixture<AnalisisDemandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisisDemandaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisDemandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
