import { ClienteService } from './../../services/cliente.service';
import { CLIENTES } from './clientes.json';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import swal from 'sweetalert2';

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

  public getClientes(): void {
    this._clienteService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      },
      error => {
        console.log(error);
      }
    );
  }

  public delete(cliente: Cliente): void {

    swal({
      title: '¿Estás seguro?',
      text: "¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._clienteService.delete(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cli => cli !== cliente) //con esto cada vez que se eliminemos uno nos recarga el listado autamaticamente sin tener que lanzar otra petición ajax al servidor
            swal(
              'Cliente Elimiado',
              `Cliente ${cliente.nombre} eliminado con éxito`,
              'success'
            )
          }
        )
      }
    });
  }

}
