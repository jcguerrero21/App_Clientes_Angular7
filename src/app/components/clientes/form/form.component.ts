import { Cliente } from 'src/app/model/cliente';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  private titulo: string = "Crear Cliente"


  constructor() {
  }

  ngOnInit() {
  }

  public create(): void{
    console.log("chekado")
    console.log(this.cliente);
  }

}
