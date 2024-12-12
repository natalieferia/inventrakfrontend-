import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../http.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-upsert-inventario-modal',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './upsert-inventario-modal.component.html',
  styleUrl: './upsert-inventario-modal.component.css'
})
export class UpsertInventarioModalComponent implements OnInit {
  public oUpserInventarioForm: FormGroup;

  constructor(
    private readonly iHttpService: HttpService,
    private readonly fb: FormBuilder,
    private readonly httpBackend: HttpService,
    public readonly dialogRef: MatDialogRef<UpsertInventarioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isUpdate: boolean, id: string | null }
  ) {
    this.oUpserInventarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.onGetDetalle();
  }

  onUpsert(){
    const oValues = this.oUpserInventarioForm.value;

    if(this.oUpserInventarioForm.invalid){
      alert("Uno o mas datos no son validos, por favor verifique");
      return;
    }

    if(this.data.id){
      this.httpBackend.actualizarInventario(this.data.id, oValues.nombre).subscribe(
        (oData) => {
          this.dialogRef.close();
        },
        (oError) => {
          alert("Ha ocurrido un error al intentar crear el inventario");
        }
      )
    } else {
      this.httpBackend.crearInventario(oValues.nombre).subscribe(
        (oData) => {
          this.dialogRef.close();
        },
        (oError) => {
          alert("Ha ocurrido un error al intentar crear el inventario");
        }
      )
    }
  }

  onGetDetalle(): void {
    if(this.data.id){
      this.iHttpService.getInventarioDetail(this.data.id).subscribe(
        (oData: any) => {
          this.oUpserInventarioForm.setValue({
            nombre: oData[0].nombre
          });
        },
        (oError) => {
          alert("Ha ocurrido un error al leer los datos");
        }
      )
    }
  }
}
