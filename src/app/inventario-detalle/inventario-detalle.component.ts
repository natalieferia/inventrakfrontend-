import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import moment from "moment";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inventario-detalle',
  imports: [CommonModule, FontAwesomeModule, AuthenticatedNavbarComponent, HttpClientModule],
  standalone: true,
  templateUrl: './inventario-detalle.component.html',
  styleUrl: './inventario-detalle.component.css'
})
export class InventarioDetalleComponent implements OnInit {
  public id!: string;
  public nombreInventario: string = "";

  public productos: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly iHttpService: HttpService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.onGetDetalle();
    this.onGetProductos();
  }

  onGetDetalle(): void {
    this.iHttpService.getInventarioDetail(this.id).subscribe(
      (oData: any) => {
        this.nombreInventario = oData[0].nombre;
      },
      (oError) => {
        alert("Ha ocurrido un error al leer los datos");
      }
    )
  }

  onGetProductos(): void {
    this.iHttpService.getProductosByInventarioDetail(this.id).subscribe(
      (oData: any) => {
        this.productos = oData;
      },
      (oError) => {
        alert("Ha ocurrido un error al leer los datos");
      }
    )
  }

  formatDate(sDate: string) {
    return moment(sDate).format("DD-MM-YYYY");
  }

  formatCurrency(sValue: string) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(parseInt(sValue));
  }

  onVender(sId: string): void {
    this.iHttpService.venderProducto(sId).subscribe(
      (oData: any) => {
        alert("Producto vendido con exito");
      },
      (oError) => {
        alert("Ha ocurrido un error al vender el producto");
      }
    )
  }
}
