import { HTTP_INTERCEPTORS } from '@angular/common/http';
//Interceptores de headers
import { TokenInterceptor } from './model/interceptors/token.interceptor';

export const Interceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];