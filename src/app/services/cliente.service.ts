import { CLIENTES } from './../components/clientes/clientes.json';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente.js';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'

  constructor(private _http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this._http.get<Cliente[]>(this.urlEndPoint); 

    // return this._http.get(this.urlEndPoint).pipe(
    //   map(response => response as Cliente[])
    // ); una forma

  }

}
