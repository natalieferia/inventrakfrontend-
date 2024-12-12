import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { HttpService } from '../http.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpsertProveedorModalComponent } from '../modals/upsert-proveedor-modal/upsert-proveedor-modal.component';

@Component({
  selector: 'app-configuracion',
  imports: [AuthenticatedNavbarComponent, CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {
  public oUpserPasswordForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly httpBackend: HttpService
  ) {
    this.oUpserPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]],
      repassword:['', [Validators.required, Validators.minLength(8), Validators.maxLength(18)]],
    });
  }

  onChangePassword(){
    const oValues = this.oUpserPasswordForm.value;

    if(this.oUpserPasswordForm.invalid){
      alert("Uno o mas datos no son validos, por favor verifique");
      return;
    }

    if(this.oUpserPasswordForm.value.password != this.oUpserPasswordForm.value.repassword){
      alert("Las contraseñas deben de ser iguales");
      return;
    }

    this.httpBackend.changePassword(this.oUpserPasswordForm.value.password).subscribe(
      (oData) => {
        alert("Se ha cambiado la contraseña de forma exitosa");
      },
      (oError) => {
        alert("Ha ocurrido un error al intentar actualizar la contraseña");
      }
    )
  }
}
