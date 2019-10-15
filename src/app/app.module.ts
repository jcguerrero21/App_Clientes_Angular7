import { ClienteService } from './services/cliente.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routing } from './app.routing';
import { RouterModule, Router } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './components/clientes/form/form.component';
import { PaginatorComponent } from './components/paginator/paginator.component';

//fechas
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

//Angular Material Datepicker
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DetalleComponent } from './components/clientes/detalle/detalle.component';
import { LoginComponent } from './components/login/login.component';
import { Interceptors } from './interceptors';
import { DetalleFacturaComponent } from './components/facturas/detalle-factura/detalle-factura.component';
import { FacturaComponent } from './components/facturas/factura/factura.component';

//Angular Material AutoComplete
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent,
    LoginComponent,
    DetalleFacturaComponent,
    FacturaComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    Routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    ClienteService,
    { provide: LOCALE_ID, useValue: 'es' },
    Interceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
