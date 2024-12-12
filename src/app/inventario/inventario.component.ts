import { Component, OnInit } from '@angular/core';
import { faEye, faFile, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { UpsertInventarioModalComponent } from '../modals/upsert-inventario-modal/upsert-inventario-modal.component';

@Component({
  selector: 'app-inventario',
  imports: [CommonModule, FontAwesomeModule, AuthenticatedNavbarComponent, HttpClientModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  public faFile = faFile;
  public faPlus = faPlus;
  public faEye = faEye;
  public faTrashCan = faTrashCan;
  public faPenToSquare = faPenToSquare;

  public oInventarios: any[] = [];

  constructor(
    private readonly iHttpService: HttpService,
    private readonly router: Router,
    private oDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllInventarios();
  }

  getAllInventarios(){
    this.iHttpService.obtenerInventarios().subscribe({
      next: (response) => {
        this.oInventarios = response as any[];
      },
      error: (err) => {
        console.error('Ha ocurrido un error al leer los inventarios');
      },
    });
  }

  onDetail(sId: string){
    this.router.navigate(['/inventrak/inventario/detalle', sId]);
  }

  openUpsertSaveModal(): void {
    const dialogRef = this.oDialog.open(UpsertInventarioModalComponent, {
      width: '400px',
      data: {
        isUpdate: false,
        id: null
       }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllInventarios();
    });
  }

  openUpsertUpdateModal(sInventarioId: string): void {
    const dialogRef = this.oDialog.open(UpsertInventarioModalComponent, {
      width: '400px',
      data: {
        isUpdate: true,
        id: sInventarioId
       }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllInventarios();
    });
  }

  eliminarInventario(sInventarioId: string){
    this.iHttpService.eliminarInventario(sInventarioId).subscribe({
      next: (response) => {
        this.getAllInventarios();
      },
      error: (err) => {
        console.error('Ha ocurrido un error al eliminar los inventarios');
      },
    });
  }
}
