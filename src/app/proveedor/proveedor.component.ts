import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { HttpService } from '../http.service';
import { UpsertProveedorModalComponent } from '../modals/upsert-proveedor-modal/upsert-proveedor-modal.component';

@Component({
  selector: 'app-proveedor',
  imports: [AuthenticatedNavbarComponent, CommonModule, FontAwesomeModule],
  templateUrl: './proveedor.component.html',
  styleUrl: './proveedor.component.css'
})
export class ProveedorComponent {
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
    this.iHttpService.obtenerProveedores().subscribe({
      next: (response) => {
        this.oRows = response as any[];
      },
      error: (err) => {
        console.error('Ha ocurrido un error al leer los proveedores');
      },
    });
  }

  openUpsertSaveModal(): void {
    const dialogRef = this.oDialog.open(UpsertProveedorModalComponent, {
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
    const dialogRef = this.oDialog.open(UpsertProveedorModalComponent, {
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
        console.error('Ha ocurrido un error al eliminar los proveedores');
      },
    });
  }
}
