import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

/** Utilizando un interceptor automáticamente pasamos el token siempre que exista en las cabceras
 * por lo tanto no tenemos que estar siempre pasandole el hhtpHeaders a las peticiones de los services o providers
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    let token = this._authService.token;

    if(token != null){
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '+token)
      });
      console.log('TokenInterceptor => Bearer ' + token);

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
