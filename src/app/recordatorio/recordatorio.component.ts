import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { HttpService } from '../http.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { UpsertRecordatorioModalComponent } from '../modals/upsert-recordatorio-modal/upsert-recordatorio-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { faPlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recordatorio',
  imports: [AuthenticatedNavbarComponent, CommonModule, FontAwesomeModule],
  templateUrl: './recordatorio.component.html',
  styleUrl: './recordatorio.component.css'
})
export class RecordatorioComponent implements OnInit {
  public oRows: any[] = [];
  public faPlus = faPlus;
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly iHttpService: HttpService,
    private oDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.iHttpService.obtenerRecordatorios().subscribe(
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

  openUpsertSaveModal(): void {
    const dialogRef = this.oDialog.open(UpsertRecordatorioModalComponent, {
      width: '400px',
      data: {
        isUpdate: false,
        id: null
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  onOpenUpsertUpdateModal(sId: string): void {
    const dialogRef = this.oDialog.open(UpsertRecordatorioModalComponent, {
      width: '400px',
      data: {
        isUpdate: true,
        id: sId
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  onEliminar(sId: string){
    this.iHttpService.eliminarRecordatorio(sId).subscribe({
      next: (response) => {
        this.getAll();
      },
      error: (err) => {
        console.error('Ha ocurrido un error al eliminar el recordatorio');
      },
    });
  }
}
