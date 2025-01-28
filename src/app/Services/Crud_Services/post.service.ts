import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  blank: any
  url
  data: BehaviorSubject<any>;

  private testImage = 'https://via.placeholder.com/1000x1000.png';
  private testSizeInBytes = 1000000; // Approximate size in bytes

  checkSpeed(): Promise<number> {
    return new Promise((resolve, reject) => {
      const startTime = performance.now();
      const image = new Image();
      image.onload = () => {
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000; // seconds
        const speed = this.testSizeInBytes / duration; // bytes per second
        resolve(speed / 1024 / 1024); // convert to Mbps
      };
      image.onerror = () => {
        reject('Failed to load the test image.');
      };
      image.src = `${this.testImage}?cacheBust=${performance.now()}`;
    });
  }

  speed: number | null = null;

  checkSpeedAndFetchData(url: any, data: any) {
    this.checkSpeed().then((speed) => {
      this.speed = speed;
      if (speed > 1) {
        this.POST(url,data);
      } else {
        console.error('Internet speed is too slow to proceed.');
      }
    });
  }
  // url=localStorage.getItem("url");
  // url1 ="http://stage1.ksofttechnology.com/api"
  // url2 = "http://fhapip.ksofttechnology.com/api"

  constructor(private http: HttpClient) {
    this.data = new BehaviorSubject(this.blank);
    // this.url = localStorage.getItem("url");
  }
  
  updateData(f: any) {
    console.log(f)
    this.data.next(this.blank = f);
    // console.log(this.url)
  }

  POST(url: any, data: any): Observable<any> {
    this.url = sessionStorage.getItem("url");
    let d = JSON.stringify(data)
    console.log(this.url)
    return this.http.post<any>(this.url + url, d).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  GET(url: any): Observable<any> {
    return this.http.get(url).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  POSTDATA(url: any, data: any): Observable<any> {
    // this.url=sessionStorage.getItem("url");
    let d = JSON.stringify(data)
    console.log(this.url)
    return this.http.post<any>("https://busy.ksofttechnology.com/api" + url, d).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError('Internal Server, Error Please Refresh The page');
  };


}
