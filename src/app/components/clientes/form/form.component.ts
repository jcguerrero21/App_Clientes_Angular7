import { ClienteService } from './../../../services/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo: string = "Crear Cliente"
  private hayCambio: boolean = false;
  private errores: String[];

  constructor(private _clienteService: ClienteService, private _router: Router, private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarCliente();
  }

  public create(): void{
    this._clienteService.create(this.cliente).subscribe(
      response => {
        this._router.navigate(['/clientes']);
        swal('Nuevo cliente', `El cliente ${response.nombre} ha sido creado con exito`, 'success');
      },
      error =>{
        this.errores = error.error.errors as string[];
        console.error("Código del error desde el backend: " + error.status);
        console.log(error.error.errors);
        swal('Nuevo cliente', `Ha ocurrido un error al crear el cliente`, 'warning');
        console.log(error);
      }
    );
  }

  public cargarCliente(): void{
    this._activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this._clienteService.getCliente(id).subscribe(
          response => {
            this.cliente = response
          }
        )
      }
    })
  }

  public update(): void{
    this._clienteService.update(this.cliente).subscribe(
      response => {
        this._router.navigate(['/clientes']);
        swal('Cliente Actualizado', `${response.cliente.nombre}`, 'success');
      },
      error =>{
        this.errores = error.error.errors as string[];
        console.error("Código del error desde el backend: " + error.status);
        console.log(error.error.errors);
        swal('Cliente Actualizado', `Ha ocurrido un error al crear el cliente`, 'warning');
        console.log(error);
      }
    )
  }

  onChange(event){
    this.hayCambio = true;
  }

}
