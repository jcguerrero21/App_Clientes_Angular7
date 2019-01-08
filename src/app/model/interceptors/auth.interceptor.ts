import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';

import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

/** Interceptor para capturar los errores 401 y 403 **/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService, private _router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        if (e.status == 401) {
          if (this._authService.isAuthenticated()) {
            this._authService.logout();
          }
          this._router.navigate(['/login'])
        }

        if (e.status == 403) {
          swal('Acceso denegado', `Hola ${this._authService.usuario.username} no tienes acceso a este recurso`, 'warning');
          this._router.navigate(['/clientes']);
        }

        return throwError(e);
      })
    );
  }
}
