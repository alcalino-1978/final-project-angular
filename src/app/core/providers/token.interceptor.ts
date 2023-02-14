import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem('token') as string;

    let request = req;
    request = req.clone({
      setHeaders: {
        authorization: `Bearer ${ token }`,
        'X-Api-Key': environment.CATS_API_KEY
      }
    });

    return next.handle(request);
  }
}
