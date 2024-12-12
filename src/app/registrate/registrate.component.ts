import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpService } from '../http.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registrate',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule,HttpClientModule],
  standalone: true,
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.css'
})
export class RegistrateComponent {
  public registrateForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private httpBackend: HttpService
  ) {
    this.registrateForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.maxLength(255), Validators.email]],
      password: ["", [Validators.required, Validators.maxLength(255), Validators.minLength(8)]],
      repeatPassword: ["", [Validators.required, Validators.maxLength(255), Validators.minLength(8)]],
      telefono: ["", [Validators.required, Validators.maxLength(13)]]
    });
  }

  onRegistrate(): void {
    if (this.registrateForm.invalid) {
      alert("Usuario o contraseña invalidos.");
      return;
    }

    const {nombre, email, password, repeatPassword, telefono} = this.registrateForm.value;

    this.httpBackend.register(nombre, email, password, repeatPassword, telefono).subscribe(
      (oData) => {
        if (oData.message == "el usuario ha sido guardado con exito") {
          alert("Se ha creado el usuario de forma exitosa")
        } else if (typeof oData.message === "string") {
          alert(oData.message)
        }
      },
      (oError) => {
        alert("Ha ocurrido un error al intentar crear el usuario");
      }
    )
  }
}
