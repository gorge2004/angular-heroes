import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';

export const publicCanMath : CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService: AuthService =  inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(  map((isAuthenticated) => !isAuthenticated),
  tap(isNotAuthenticated => {
  if(!isNotAuthenticated){
    router.navigate(['heroes']);
  }
}),) ;
};

export const publicCanActivate: CanActivateFn =
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService: AuthService =  inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    map((isAuthenticated) => !isAuthenticated),
    tap(isNotAuthenticated => {
    if(!isNotAuthenticated){
      router.navigate(['heroes']);
    }
  }),  ) ;
};
