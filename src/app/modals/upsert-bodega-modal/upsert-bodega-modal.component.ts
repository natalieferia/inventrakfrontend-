import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-upsert-bodega-modal',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './upsert-bodega-modal.component.html',
  styleUrl: './upsert-bodega-modal.component.css'
})
export class UpsertBodegaModalComponent implements OnInit {
  public oUpserBodegaForm: FormGroup;

  constructor(
    private readonly iHttpService: HttpService,
    private readonly fb: FormBuilder,
    private readonly httpBackend: HttpService,
    public readonly dialogRef: MatDialogRef<UpsertBodegaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isUpdate: boolean, id: string | null }
  ) {
    this.oUpserBodegaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      dirreccion:['', [Validators.required, Validators.maxLength(255)]],
      telefono:['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      correo:['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      gerente: ['', [Validators.required, Validators.maxLength(255)]],
      capacidadAlmacenamiento: ['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
    });
  }

  ngOnInit(): void {
    this.onGetDetalle();
  }

  onUpsert(){
    const oValues = this.oUpserBodegaForm.value;

    if(this.oUpserBodegaForm.invalid){
      alert("Uno o mas datos no son validos, por favor verifique");
      return;
    }

    if(this.data.id){
      this.httpBackend.actualizarBodega(this.data.id, oValues.nombre, oValues.dirreccion, oValues.telefono, oValues.correo, oValues.gerente, parseFloat(oValues.capacidadAlmacenamiento)).subscribe(
        (oData) => {
          this.dialogRef.close();
        },
        (oError) => {
          alert("Ha ocurrido un error al intentar actualizar la bodega");
        }
      )
    } else {
      this.httpBackend.crearBodega(oValues.nombre, oValues.dirreccion, parseInt(oValues.telefono), oValues.correo, oValues.gerente, parseFloat(oValues.capacidadAlmacenamiento)).subscribe(
        (oData) => {
          this.dialogRef.close();
        },
        (oError) => {
          alert("Ha ocurrido un error al intentar crear la bodega");
        }
      )
    }
  }

  onGetDetalle(): void {
    if(this.data.id){
      this.iHttpService.getBodegaDetail(this.data.id).subscribe(
        (oData: any) => {
          this.oUpserBodegaForm.setValue({
            nombre: oData[0].nombre,
            dirreccion: oData[0].direccion,
            telefono: oData[0].telefono,
            correo: oData[0].correo_electronico,
            gerente: oData[0].gerente_de_la_bodega,
            capacidadAlmacenamiento: oData[0].capacidad_de_almacenamiento_m3,
          });
        },
        (oError) => {
          alert("Ha ocurrido un error al leer los datos");
        }
      )
    }
  }
}
