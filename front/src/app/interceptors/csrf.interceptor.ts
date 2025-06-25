import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headerName = 'X-XSRF-TOKEN';
    let token = this.tokenExtractor.getToken() as string;

    if (token && request.method !== 'GET' && request.method !== 'HEAD') {
      request = request.clone({ headers: request.headers.set(headerName, token) });
    }

    request = request.clone({ withCredentials: true });

    return next.handle(request);
  }
}