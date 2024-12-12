import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, HttpClientModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private httpBackend: HttpService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      alert("Usuario o contraseña invalidos.");
      return;
    }

    const {email, password} = this.loginForm.value;

    this.httpBackend.login(email, password).subscribe(
      (oData) => {
        if (oData.message == "ok") {
          alert("Has iniciado sesión de forma exitosa")
          this.router.navigate(['/inventrak/perfil'])
        } else if (typeof oData.message === "string") {
          alert(oData.message)
        }
      },
      (oError) => {
        alert("Ha ocurrido un error al intentar iniciar sesión");
      }
    )
  }
}
