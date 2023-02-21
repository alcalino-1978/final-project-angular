import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from '@shared/services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) { }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token: string = localStorage.getItem('token') as string;
    console.log('token interceptor:', token)

    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`,
          'X-Api-Key': environment.CATS_API_KEY as string,
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Headers': 'Accept',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        },
      });
    }
    return next.handle(request);
  }
}
