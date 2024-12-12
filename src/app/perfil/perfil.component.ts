import { Component, OnInit } from '@angular/core';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, AuthenticatedNavbarComponent, HttpClientModule],
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  public sPerfilName = "";
  public sPerfilCorreo = "";
  public sPerfilTelefono = "";

  constructor(
    private readonly httpBackend: HttpService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.obtenerUsuarioSesion();
  }

  public irA(destino: string) {
    this.router.navigate([destino])
  }

  private async obtenerUsuarioSesion() {
    this.httpBackend.obtenerUsuarioenSesion().subscribe(
      (oData: any) => {
        this.sPerfilName = oData.nombres;
        this.sPerfilCorreo = oData.correo;
        this.sPerfilTelefono = oData.telefono;
      },
      (oError) => {
        this.router.navigate(['/inventrak/iniciar-sesion'])
      }
    )
  }
}
