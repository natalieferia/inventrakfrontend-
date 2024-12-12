import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import moment from "moment";
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-reportes',
  imports: [AuthenticatedNavbarComponent, CommonModule, FontAwesomeModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  public oRows: any[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly iHttpService: HttpService
  ) { }
  ngOnInit(): void {
    this.iHttpService.getProductosReporte().subscribe(
      (oData: any) => {
        this.oRows = oData;
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
