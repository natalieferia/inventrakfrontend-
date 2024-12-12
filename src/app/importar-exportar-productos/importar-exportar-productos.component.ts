import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from '../http.service';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-importar-exportar-productos',
  imports: [FontAwesomeModule, AuthenticatedNavbarComponent, HttpClientModule],
  standalone: true,
  templateUrl: './importar-exportar-productos.component.html',
  styleUrl: './importar-exportar-productos.component.css'
})
export class ImportarExportarProductosComponent {
  protected readonly faDownload = faDownload;
  protected readonly faUpload = faUpload;

  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedFile: File | null = null;

  constructor(
    private readonly iHttpService: HttpService
  ) {
  }

  descargarPlantilla() {
    window.open(this.iHttpService.getUrlBackend() + "/api/exportar/productos");
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.selectedFile = file;
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.fileInput.nativeElement.value = null;
      this.iHttpService.importarExcelProductos(formData).subscribe({
        next: (response) => {
          alert('Se han importado los productos con éxito');
        },
        error: (err) => {
          alert('Ha ocurrido un error al importar los productos');
        },
      });
    }
  }
}
