import { Component, OnInit } from '@angular/core';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from '../http.service';
import { faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UpsertBodegaModalComponent } from '../modals/upsert-bodega-modal/upsert-bodega-modal.component';

@Component({
  selector: 'app-bodega',
  imports: [AuthenticatedNavbarComponent, CommonModule, FontAwesomeModule, ],
  templateUrl: './bodega.component.html',
  styleUrl: './bodega.component.css'
})
export class BodegaComponent implements OnInit {
  public oRows: any[] = [];
  public faPlus = faPlus;
  public faPenToSquare = faPenToSquare;
  public faTrashCan = faTrashCan;

  constructor(
    private readonly iHttpService: HttpService,
    private oDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.iHttpService.obtenerBodegas().subscribe({
      next: (response) => {
        this.oRows = response as any[];
      },
      error: (err) => {
        console.error('Ha ocurrido un error al leer las bodegas');
      },
    });
  }

  openUpsertSaveModal(): void {
    const dialogRef = this.oDialog.open(UpsertBodegaModalComponent, {
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
    const dialogRef = this.oDialog.open(UpsertBodegaModalComponent, {
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
    this.iHttpService.eliminarBodega(sId).subscribe({
      next: (response) => {
        this.getAll();
      },
      error: (err) => {
        console.error('Ha ocurrido un error al eliminar las bodegas');
      },
    });
  }
}
