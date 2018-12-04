import { ClienteService } from './../../services/cliente.service';
import { CLIENTES } from './clientes.json';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private _clienteService: ClienteService) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this._clienteService.getClientes().subscribe(
      clientes =>{
        this.clientes = clientes;
      },
      error =>{
        console.log(error);
      }
    );
  }

}
