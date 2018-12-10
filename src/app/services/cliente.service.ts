import { Router } from '@angular/router';
import { CLIENTES } from './../components/clientes/clientes.json';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente.js';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private _http: HttpClient, private _router: Router) { }

  getClientes(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(this.urlEndPoint); 

    // return this._http.get(this.urlEndPoint).pipe(
    //   map(response => response as Cliente[])
    // ); una forma
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this._http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(error => {

        if(error.status == 400){
          return throwError(error);
        }

        console.log(error.error.mensaje);
        swal(error.error.mensaje, error.error.error, 'error');
        return throwError(error);
      })
    ); 
  }

  getCliente(id): Observable<Cliente>{
    return this._http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(error => {
        this._router.navigate(['/clientes']);
        console.log(error.error.mensaje);
        swal('Error al editar', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this._http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(error => {

        if(error.status == 400){
          return throwError(error);
        }

        console.log(error.error.mensaje);
        swal(error.error.mensaje, error.error.error, 'error');
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this._http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(error => {
        console.log(error.error.mensaje);
        swal(error.error.mensaje, error.error.error, 'error');
        return throwError(error);
      })
    );
  }

}
