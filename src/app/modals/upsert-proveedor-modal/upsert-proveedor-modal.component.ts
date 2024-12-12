import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-upsert-proveedor-modal',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule,MatDialogModule],
  templateUrl: './upsert-proveedor-modal.component.html',
  styleUrl: './upsert-proveedor-modal.component.css'
})
export class UpsertProveedorModalComponent {
  public oUpserProveedorForm: FormGroup;

  constructor(
    private readonly iHttpService: HttpService,
    private readonly fb: FormBuilder,
    private readonly httpBackend: HttpService,
    public readonly dialogRef: MatDialogRef<UpsertProveedorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isUpdate: boolean, id: string | null }
  ) {
    this.oUpserProveedorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      dirreccion:['', [Validators.required, Validators.maxLength(255)]],
      telefono:['', [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)]],
      correo:['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      personaContacto: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    this.onGetDetalle();
  }

  onUpsert(){
    const oValues = this.oUpserProveedorForm.value;

    if(this.oUpserProveedorForm.invalid){
      alert("Uno o mas datos no son validos, por favor verifique");
      return;
    }

    if(this.data.id){
      this.httpBackend.actualizarProveedor(this.data.id, oValues.nombre, oValues.dirreccion, oValues.telefono, oValues.correo, oValues.personaContacto).subscribe(
        (oData) => {
          this.dialogRef.close();
        },
        (oError) => {
          alert("Ha ocurrido un error al intentar actualizar el proveedor");
        }
      )
    } else {
      this.httpBackend.crearProveedor(oValues.nombre, oValues.dirreccion, parseInt(oValues.telefono), oValues.correo, oValues.personaContacto).subscribe(
        (oData) => {
          this.dialogRef.close();
        },
        (oError) => {
          alert("Ha ocurrido un error al intentar crear el proveedor");
        }
      )
    }
  }

  onGetDetalle(): void {
    if(this.data.id){
      this.iHttpService.getProveedorDetail(this.data.id).subscribe(
        (oData: any) => {
          this.oUpserProveedorForm.setValue({
            nombre: oData[0].nombre,
            dirreccion: oData[0].direccion,
            telefono: oData[0].telefono,
            correo: oData[0].correo_electronico,
            personaContacto: oData[0].persona_de_contacto
          });
        },
        (oError) => {
          alert("Ha ocurrido un error al leer los datos");
        }
      )
    }
  }
}
