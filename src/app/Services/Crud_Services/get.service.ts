import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  // url
  constructor(private http: HttpClient) {    
  // this.url = sessionStorage.getItem("url");
   }

  GET(url: any): Observable<any> {
    // console.log(this.url)
    return this.http.get(url).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    return throwError('Something bad happened; please try again later.');
  };



 
}
