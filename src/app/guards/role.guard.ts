import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //primero validamos si esta autenticado y si no al login
    if (!this._authService.isAuthenticated()) {
      this._router.navigate(['/login'])
      return true;
    }

    //después validamos por el rol si si está autenticado
    let role = next.data['role'] as string;
    console.log(role);
    if (this._authService.hasRole(role)) {
      return true;
    }
    swal('Acceso denegado', `Hola ${this._authService.usuario.username} no tienes acceso a este recurso`, 'warning');
    this._router.navigate(['/clientes']);
    return false;
  }
}
