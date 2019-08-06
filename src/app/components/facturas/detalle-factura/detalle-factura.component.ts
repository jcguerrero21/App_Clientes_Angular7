import { Component, OnInit } from '@angular/core';
import { FacturasService } from '../../../services/facturas.service';
import { Factura } from '../../../model/facturas/factura';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
  styleUrls: ['./detalle-factura.component.scss']
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo: string = 'Factura';

  constructor(private _facturaService: FacturasService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this._facturaService.getFactura(id).subscribe(factura => this.factura = factura);
    });
  }

}
