import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMenu } from './interface/menu.interface';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-authenticated-navbar',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './authenticated-navbar.component.html',
  styleUrl: './authenticated-navbar.component.css'
})
export class AuthenticatedNavbarComponent {
  public readonly oMenus: IMenu[] = [
    {
      path: "/inventrak/perfil",
      text: "General"
    },
    {
      path: "/inventrak/productos/importar-exportar",
      text: "Importar/Exportar Excel"
    },
    {
      path: "/inventrak/inventario",
      text: "Mis Inventarios"
    },
    {
      path: "/inventrak/bodegas",
      text: "Mis Bodegas"
    },
    {
      path: "/inventrak/proveedor/",
      text: "Mis Proveedores"
    },
    {
      path: "/inventrak/reportes/",
      text: "Reportes"
    },
    {
      path: "/inventrak/configuracion/",
      text: "Configuración"
    },
    {
      path: "/inventrak/averias/",
      text: "Averías"
    },
    {
      path: "/inventrak/recordatorio",
      text: "Recordatorios"
    },
    {
      path: "/inventrak/analisis-demanda/",
      text: "Analisis Demanda"
    },
    {
      path: "/inventrak/control-calidad/",
      text: "Control Calidad"
    },
    {
      path: "/inventrak/soporte",
      text: "Soporte"
    },
    {
      path: "/cerrar-session",
      text: "Cerrar Sesión"
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly iHttpService: HttpService
  ) { }

  public irA(destino: string | null): void {
    if (destino == null) {
      return;
    }

    if(destino == "/cerrar-session"){
      this.iHttpService.cerrarSession().subscribe(
        (oData) => {
          this.irA('')
        },
        (oError) => {
          alert("Ha ocurrido un error al cerrar la sesion");
        }
      )
      return;
    }

    this.router.navigate([destino])
  }

  public isSameRoute(destino: string | null): boolean {
    if (destino == null) {
      return false;
    }
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      return window.location.pathname.endsWith(destino);
    } else {
      return false;
    }
  }
}
