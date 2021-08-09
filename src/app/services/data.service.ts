import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRes } from '../interfaces/auth-res';
import { Partido } from '../interfaces/partido';
import { Equipo } from '../interfaces/equipo';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private API:string = 'http://localhost:8887/';
  private headers:HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) {

  }

  signUp(data:any):Observable<AuthRes>{
    return this.http.post<AuthRes>(this.API + 'auth/signUp', data);
  }

  login(data:any):Observable<AuthRes>{
    return this.http.post<AuthRes>(this.API + 'auth/signIn', data);
  }

  getEquipos():Observable<Equipo[]>{
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + (localStorage.getItem('JWT') || ''));
    return this.http.get<Equipo[]>(this.API + 'api/equipos/all', {headers: this.headers});
  }

  crearPartido(data:any):Observable<Partido>{
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + (localStorage.getItem('JWT') || ''));
    return this.http.post<Partido>(this.API + 'api/partidos/save', data, {headers: this.headers});
  }

  getPartido(id:number):Observable<Partido>{
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + (localStorage.getItem('JWT') || ''));
    return this.http.get<Partido>(this.API + 'api/partidos/id/' + id, {headers: this.headers});
  }

  getPartidos():Observable<Partido[]>{
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + (localStorage.getItem('JWT') || ''));
    return this.http.get<Partido[]>(this.API + 'api/partidos/all', {headers: this.headers});
  }

  saveScore(data:any):Observable<Partido>{
    this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + (localStorage.getItem('JWT') || ''));
    return this.http.put<Partido>(this.API + 'api/partidos/update', data, {headers: this.headers});
  }
}
