import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private url: string = "https://inventrakbackend-343243084562.us-east4.run.app";

  constructor(
    private http: HttpClient
  ) {
  }

  getUrlBackend(){
    return this.url;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.url + "/login", {
      username, password
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )

  }

  register(nombre: string, email: string, password: string, repeatPassword: string, telefono: string) {
    return this.http.post<any>(this.url + "/registrate", {
      nombre, email, password, repeatPassword, telefono: telefono.toString()
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  changePassword(password: string) {
    return this.http.put<any>(this.url + "/change-password", {
      password
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )

  }

  obtenerUsuarioenSesion() {
    return this.http.get(this.url + '/obtener-usuario-en-sesion', {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  importarExcelProductos(oFormData: FormData) {
    return this.http.post(this.url + '/api/importar/productos', oFormData, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  obtenerInventarios() {
    return this.http.get(this.url + '/api/leer/inventarios', {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  getInventarioDetail(sId: string): Observable<object> {
    return this.http.get(this.url + '/api/leer/inventarios/'+sId, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  getProductosMasVendidos(): Observable<object> {
    return this.http.get(this.url + '/api/leer/productos/mas-vendidos', {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  venderProducto(sId: string): Observable<object> {
    return this.http.post(this.url + '/api/vender/producto/' +sId, null,{withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  getProductosByInventarioDetail(sId: string): Observable<object> {
    return this.http.get(this.url + '/api/leer/productos/inventario/'+sId, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  getProductosReporte(): Observable<object> {
    return this.http.get(this.url + '/api/leer/productos/reporte', {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  getProductosAverias(): Observable<object> {
    return this.http.get(this.url + '/api/leer/productos/averias', {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  crearInventario(nombre: string) {
    return this.http.post<any>(this.url + "/api/crear/inventario", {
      nombre
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  actualizarInventario(sInventarioId: string, nombre: string) {
    return this.http.put<any>(this.url + "/api/actualizar/inventarios/" + sInventarioId, {
      nombre
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  eliminarInventario(sInventarioId: string) {
    return this.http.delete<any>(this.url + "/api/eliminar/inventarios/" + sInventarioId, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  cerrarSession() {
    return this.http.get<any>(this.url + "/api/cerrar/session", {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  obtenerBodegas() {
    return this.http.get(this.url + '/api/leer/bodegas', {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  getBodegaDetail(sId: string): Observable<object> {
    return this.http.get(this.url + '/api/leer/bodegas/'+sId, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  crearBodega(nombre: string, direccion: string, telefono: number, correo: string, gerente: string, capacidadAlmacenamiento: number) {
    return this.http.post<any>(this.url + "/api/crear/bodegas", {
      nombre, direccion, telefono, correoElectronico: correo, gerenteBodega: gerente, capacidadAlmacenamiento
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  actualizarBodega(sId: string, nombre: string, direccion: string, telefono: string, correo: string, gerente: string, capacidadAlmacenamiento: number) {
    return this.http.put<any>(this.url + "/api/actualizar/bodegas/" + sId, {
      nombre, direccion, telefono, correoElectronico: correo, gerenteBodega: gerente, capacidadAlmacenamiento
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  eliminarBodega(sId: string) {
    return this.http.delete<any>(this.url + "/api/eliminar/bodegas/" + sId, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  obtenerProveedores() {
    return this.http.get(this.url + '/api/leer/proveedores', {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  getProveedorDetail(sId: string): Observable<object> {
    return this.http.get(this.url + '/api/leer/proveedores/'+sId, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  crearProveedor(nombre: string, direccion: string, telefono: number, correo: string, personaContacto: string) {
    return this.http.post<any>(this.url + "/api/crear/proveedor", {
      nombre, direccion, telefono, correoElectronico: correo, personaContacto
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  actualizarProveedor(sId: string, nombre: string, direccion: string, telefono: string, correo: string, personaContacto: string) {
    return this.http.put<any>(this.url + "/api/actualizar/proveedores/" + sId, {
      nombre, direccion, telefono, correoElectronico: correo, personaContacto
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  eliminarProveedor(sId: string) {
    return this.http.delete<any>(this.url + "/api/eliminar/proveedores/" + sId, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  obtenerRecordatorios() {
    return this.http.get(this.url + '/api/leer/recordatorio', {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  getRecordatorioDetail(sId: string): Observable<object> {
    return this.http.get(this.url + '/api/leer/recordatorio/'+sId, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  crearRecordatorio(nombre: string, descripcion: string) {
    return this.http.post<any>(this.url + "/api/crear/recordatorio", {
      nombre, descripcion
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  actualizarRecordatorio(sId: string, nombre: string, descripcion: string) {
    return this.http.put<any>(this.url + "/api/actualizar/recordatorio/" + sId, {
      nombre, descripcion
    }, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  eliminarRecordatorio(sId: string) {
    return this.http.delete<any>(this.url + "/api/eliminar/recordatorio/" + sId, {withCredentials: true}).pipe(
      catchError(this.cathErrorBackend)
    )
  }

  private cathErrorBackend(error: HttpErrorResponse) {
    console.log("error:" + error.message);
    return throwError("No se pudo conectar al backend")
  }
}
