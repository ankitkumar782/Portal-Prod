import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MainService {

  constructor() { }
  token = sessionStorage.getItem("Token")
  started = Date.now()
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    try {
      if (this.token) {
        return next.handle(req.clone({
          headers: req.headers.set('Content-Type', 'application/json'),
        }))
      }
      //    // if user login then modify request here

      else {
        return next.handle(req.clone({
          headers: req.headers.set('Content-Type', 'application/json'),
        }))
      }
    }
    catch {
      throw new Error('Method not implemented.');
    }

  }
}
