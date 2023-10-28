import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl: string = enviroments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    return this.user ? structuredClone(this.user) : undefined;
  }

  login(username: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/user/1`).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', 'asdad123df1dhysdmkk-.asfdrq.sdf');
      })
    );
    /* return  this.httpClient.post<User>(`${this.baseUrl}`, {username, password}); */
  }
  checkAuthentication():Observable<boolean> {

    const token: string| null = localStorage.getItem('token');
    if (!token)
    {

      return of(false);
    }
    return this.httpClient.get<User>(`${this.baseUrl}/user/1`).pipe(
      tap(user => this.user = user),
      map( user  =>  !!user),
      catchError( err => of(false))
    );
  }


  logout(): void {
    this.user = undefined;
    localStorage.removeItem('token');
  }
}
