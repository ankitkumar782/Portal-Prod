import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor() { }
  get isLoggedIn(): boolean {
    let authToken = sessionStorage.getItem('Token');
    if (authToken !== null) {
      return true
    }
    return false;

  }
}
