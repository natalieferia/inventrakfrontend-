import { Routes } from '@angular/router';
import { ImportarExportarProductosComponent } from './importar-exportar-productos/importar-exportar-productos.component';
import { InventarioDetalleComponent } from './inventario-detalle/inventario-detalle.component';
import { InventarioComponent } from './inventario/inventario.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { SoporteComponent } from './soporte/soporte.component';
import { BodegaComponent } from './bodega/bodega.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { ReportesComponent } from './reportes/reportes.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { AnalisisDemandaComponent } from './analisis-demanda/analisis-demanda.component';
import { ControlCalidadComponent } from './control-calidad/control-calidad.component';
import { AveriaComponent } from './averia/averia.component';
import { RecordatorioComponent } from './recordatorio/recordatorio.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: "/inventrak",
  },
  {
    path: 'inventrak',
    children: [
      {
        path: 'iniciar-sesion',
        component: LoginComponent
      },
      {
        path: "registrate",
        component: RegistrateComponent
      },
      {
        path: "perfil",
        component: PerfilComponent
      },
      {
        path: "inventario",
        children: [
          {
            path: "detalle/:id",
            
            component: InventarioDetalleComponent
          },
          {
            path: "",
            component: InventarioComponent
          }
        ]
      },
      {
        path: "productos",
        children: [
          {
            path: "importar-exportar",
            component: ImportarExportarProductosComponent
          }
        ]
      },
      {
        path: "bodegas",
        component: BodegaComponent
      },
      {
        path: "proveedor",
        component: ProveedorComponent
      },
      {
        path: "reportes",
        component: ReportesComponent
      },
      {
        path: "configuracion",
        component: ConfiguracionComponent
      },
      {
        path: "analisis-demanda",
        component: AnalisisDemandaComponent
      },
      {
        path: "control-calidad",
        component: ControlCalidadComponent
      },
      {
        path: "averias",
        component: AveriaComponent
      },
      {
        path: "recordatorio",
        component: RecordatorioComponent
      },
      {
        path: "soporte",
        component: SoporteComponent
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "iniciar-sesion"
      },
    ]
  },
];
