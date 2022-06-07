import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseURL: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe>{
    return this.http.get<Heroe>(`${this.baseURL}/heroes/${id}`);
  }

  getSugerencias( termino:string): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseURL}/heroes?q=${termino}&_limit=6`);
  }

}
