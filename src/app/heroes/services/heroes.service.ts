import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interfaces';
import { Observable, catchError, map, of } from 'rxjs';
import { enviroments } from 'src/environments/environments';
@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = enviroments.baseUrl;

  constructor(private http: HttpClient) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }
  getHeroByid(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestion(query: string): Observable<Hero[]> {

    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }
  addHero(hero: Hero): Observable<Hero>{

    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }
  updateHero(hero: Hero): Observable<Hero>{
    if (!hero) throw Error(`hero Id is required`);
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero);
  }

  deleteHero(id: string): Observable<boolean>{
    if (!id) throw Error(`hero Id is required`);
    return this.http.delete<boolean>(`${this.baseUrl}/heroes/${id}`).pipe(
      map((response) => true),
      catchError( error => of(false)),
    );
  }
}
