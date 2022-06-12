import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) { }

  get auth() {
    return {...this._auth};
  }

  verificaAutenticacion(): Observable<boolean>{
    if(!localStorage.getItem('token')) {
      return of(false);
    }
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        map( auth => {
          this._auth = auth;
          return true;
        })
      );
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id))
      );
  }

  logout() {
    this._auth = undefined;
    localStorage.removeItem('token');
  }
}
