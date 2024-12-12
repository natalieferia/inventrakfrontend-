import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from '../../http.service';
import { UpsertBodegaModalComponent } from '../upsert-bodega-modal/upsert-bodega-modal.component';

@Component({
  selector: 'app-upsert-recordatorio-modal',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './upsert-recordatorio-modal.component.html',
  styleUrl: './upsert-recordatorio-modal.component.css'
})
export class UpsertRecordatorioModalComponent implements OnInit {
  public oUpserRecordatorioForm: FormGroup;

  constructor(
    private readonly iHttpService: HttpService,
    private readonly fb: FormBuilder,
    private readonly httpBackend: HttpService,
    public readonly dialogRef: MatDialogRef<UpsertBodegaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isUpdate: boolean, id: string | null }
  ) {
    this.oUpserRecordatorioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion:['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.onGetDetalle();
  }

  onUpsert(){
    const oValues = this.oUpserRecordatorioForm.value;

    if(this.oUpserRecordatorioForm.invalid){
      alert("Uno o mas datos no son validos, por favor verifique");
      return;
    }

    if(this.data.id){
      this.httpBackend.actualizarRecordatorio(this.data.id, oValues.nombre, oValues.descripcion).subscribe(
        (oData) => {
          this.dialogRef.close();
        },
        (oError) => {
          alert("Ha ocurrido un error al intentar actualizar el recordatorio");
        }
      )
    } else {
      this.httpBackend.crearRecordatorio(oValues.nombre, oValues.descripcion).subscribe(
        (oData) => {
          this.dialogRef.close();
        },
        (oError) => {
          alert("Ha ocurrido un error al intentar crear el recordatorio");
        }
      )
    }
  }

  onGetDetalle(): void {
    if(this.data.id){
      this.iHttpService.getBodegaDetail(this.data.id).subscribe(
        (oData: any) => {
          this.oUpserRecordatorioForm.setValue({
            nombre: oData[0].nombre,
            descripcion: oData[0].direccion,
          });
        },
        (oError) => {
          alert("Ha ocurrido un error al leer los datos");
        }
      )
    }
  }
}
