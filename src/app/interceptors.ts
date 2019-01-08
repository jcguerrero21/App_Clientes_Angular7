import { HTTP_INTERCEPTORS } from '@angular/common/http';
//Interceptores de headers
import { TokenInterceptor } from './model/interceptors/token.interceptor';
import { AuthInterceptor } from './model/interceptors/auth.interceptor';

export const Interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];