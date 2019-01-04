import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
      if(this.isTokenExpirado()){
        this._authService.logout();
        this._router.navigate(['/login']);
        return false;
      }
      return true;
    }
    this._router.navigate(['/login'])
    return false;
  }

  isTokenExpirado():boolean{
    let token = this._authService.token;
    let payload = this._authService.obtenerDatosToken(token);
    let now = new Date().getTime() /1000; //para obtener la fecha y hora actual en segundos
    //comprobamos si la fecha del token es menor a la fecha actual y si es asi retornamos true porque ha expirado
    if(payload.exp < now){
      return true;
    }
    return false;
  }

}
