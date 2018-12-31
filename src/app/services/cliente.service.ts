import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente.js';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Region } from '../model/region.js';
//import { formatDate, DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(private _http: HttpClient, private _router: Router) { }

  // SIN PAGINADOR
  // getClientes(): Observable<Cliente[]> {
  //   // return this._http.get<Cliente[]>(this.urlEndPoint); una forma

  //   return this._http.get(this.urlEndPoint).pipe(
  //     tap(response => {
  //       let clientes = response as Cliente[];
  //       console.log('ClienteService: tap1');
  //       clientes.forEach( cliente => {
  //         console.log(cliente.nombre);
  //       })
  //     }),
  //     map(response => {
  //       let clientes = response as Cliente[];

  //       return clientes.map(cliente => {
  //         cliente.nombre = cliente.nombre.toUpperCase();

  //         //let datePipe = new DatePipe('es');
  //         //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy'); //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
  //         return cliente;
  //       });
  //     }),
  //     tap(response => {
  //       console.log('ClienteService: tap2');
  //       response.forEach( cliente => {
  //         console.log(cliente.nombre);
  //       })
  //     })
  //   ); 
  // }

  //CON PAGINADOR
  getClientes(page: number): Observable<any> {
    return this._http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      }),
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy'); //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this._http.post(this.urlEndPoint, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(error => {

        if (error.status == 400) {
          return throwError(error);
        }

        console.log(error.error.mensaje);
        swal(error.error.mensaje, error.error.error, 'error');
        return throwError(error);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this._http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(error => {
        this._router.navigate(['/clientes']);
        console.log(error.error.mensaje);
        swal('Error al editar', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this._http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError(error => {

        if (error.status == 400) {
          return throwError(error);
        }

        console.log(error.error.mensaje);
        swal(error.error.mensaje, error.error.error, 'error');
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this._http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData, {
      reportProgress: true
    });

    return this._http.request(req);
  }

  getRegiones(): Observable<Region[]>{
    return this._http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

}
