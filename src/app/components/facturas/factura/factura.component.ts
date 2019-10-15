import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/model/facturas/factura';
import { ClienteService } from '../../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, flatMap } from 'rxjs/operators';
import { FacturasService } from '../../../services/facturas.service';
import { Producto } from 'src/app/model/facturas/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ItemFactura } from '../../../model/facturas/item-factura';
import swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html'
})
export class FacturaComponent implements OnInit {

  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  autoCompleteControl = new FormControl();
  productosFiltrados: Observable<Producto[]>;

  constructor(private _clienteService: ClienteService,
    private _facturaService: FacturasService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(params => {
      let clienteId = + params.get('clienteId');
      this._clienteService.getCliente(clienteId).subscribe(cliente => {
        this.factura.cliente = cliente;
      });
    })

    this.productosFiltrados = this.autoCompleteControl.valueChanges
      .pipe(
        startWith(''),
        map(producto => typeof producto === 'string' ? producto : producto.nombre),
        flatMap(producto => producto ? this._filter(producto) : [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this._facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): String | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;


    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id)
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;

    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad++;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.producto.id);;
  }

  create(facturaForm): void {

    if(this.factura.items.length == 0) {
      this.autoCompleteControl.setErrors({'invalid': true});
    }

    if (facturaForm.form.valid && this.factura.items.length > 0) {
      this._facturaService.create(this.factura).subscribe(factura => {
        console.log(factura);
        swal(this.titulo, `Factura ${factura.descripcion} creada con exito`, 'success');
        this._router.navigate(['/clientes']);
      });
    }

  }

}
