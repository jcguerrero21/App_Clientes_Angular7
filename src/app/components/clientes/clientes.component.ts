import { ActivatedRoute } from '@angular/router';
import { ClienteService } from './../../services/cliente.service';
import { CLIENTES } from './clientes.json';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/model/cliente';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  page: number;
  
  constructor(private _clienteService: ClienteService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getClientes();
  }

  public getClientes(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      let page = + params.get('page');
      if (!page) {
        page = 0;
      }
      this.page = page;
      this._clienteService.getClientes(page)
        .pipe(
          tap(response => {
            console.log('ClientesComponent: tap3');
            (response.content as Cliente[]).forEach(cliente => {
              console.log(cliente.nombre);
            });
          })
        ).subscribe(response => {
          this.clientes = response.content as Cliente[],
          this.paginador = response;
        });
    });
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
