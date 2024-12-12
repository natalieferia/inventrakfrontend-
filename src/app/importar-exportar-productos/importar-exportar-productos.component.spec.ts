import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarExportarProductosComponent } from './importar-exportar-productos.component';

describe('ImportarExportarProductosComponent', () => {
  let component: ImportarExportarProductosComponent;
  let fixture: ComponentFixture<ImportarExportarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportarExportarProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarExportarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
