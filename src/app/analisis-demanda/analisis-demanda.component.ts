import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-analisis-demanda',
  imports: [CommonModule, FontAwesomeModule, AuthenticatedNavbarComponent, HttpClientModule],
  templateUrl: './analisis-demanda.component.html',
  styleUrl: './analisis-demanda.component.css'
})
export class AnalisisDemandaComponent implements OnInit {
  public id!: string;
  public nombreInventario: string = "";

  public productos: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly iHttpService: HttpService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.onGetProductos();
  }

  onGetProductos(): void {
    this.iHttpService.getProductosMasVendidos().subscribe(
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
}
