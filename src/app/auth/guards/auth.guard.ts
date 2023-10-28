import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authCanMath : CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService: AuthService =  inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(tap(isAuthenticated => {
    if(!isAuthenticated){
      router.navigate(['auth/login']);
    }
  }) ) ;
};

export const authCanActivate: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService =  inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(tap(isAuthenticated => {
    if(!isAuthenticated){
      router.navigate(['auth/login']);
    }
  }) ) ;
};
@Injectable({ providedIn: 'root' })
export class AuthGuard  {
  constructor( private authService:AuthService) {

  }

  checkAuthStatus(): boolean {

     this.authService.checkAuthentication().pipe(

    ).subscribe ( isAuthenticated => isAuthenticated);
    return true;
  }
}
