import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/clientes/form/form.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/clientes', pathMatch: 'full'},
    {path: 'directivas', component: ClientesComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'clientes/page/:page', component: ClientesComponent},
    {path: 'clientes/form', component: FormComponent},
    {path: 'clientes/form/:id', component: FormComponent}
  ];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);