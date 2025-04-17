import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    let internalError: string | null = null;

    const token = this.authService.getToken();
    if (!token) {
      return true;
    }

    let valid: boolean = false;

    try {

      valid = await this.authService
        .isAuthenticated({ token: token.accessToken })
        .pipe(
          map(( valid ) => {
            // console.log('Respuesta payload:', valid); // Inspeccionamos el payload
            return !!valid;
          }),
          catchError((error: HttpErrorResponse) => {
            internalError = '/';
            return of(false);
          })
        )
        .toPromise() ?? false; // <- Aquí nos aseguramos que no quede undefined

    } catch (error) {
      valid = false;
    }

    if (!valid) {
      const refreshed = await this.authService.refreshTokenOrLogout(token.refreshToken, state);
      if (!refreshed) {
        return true;
      }
    }

    this.router.navigate(['/']);
    return false;

  }

  // private async validate(state: RouterStateSnapshot): Promise<boolean> {
  //   // console.log('validate');

  //   let internalError: string | null = null;

  //   const token = this.authService.getToken();
  //   // console.log('tokencito', token);

  //   if (!token) {
  //     this.authService.logout();
  //     this.router.navigate(['auth/login'])
  //     return false;
  //   }

  //   let valid: boolean = false;

  //   try {

  //     valid = await this.authService
  //       .isAuthenticated({ token: token.accessToken })
  //       .pipe(
  //         map(( valid ) => {
  //           // console.log('Respuesta payload:', valid); // Inspeccionamos el payload
  //           return !!valid;
  //         }),
  //         catchError((error: HttpErrorResponse) => {
  //           internalError = 'auth/login';
  //           return of(false);
  //         })
  //       )
  //       .toPromise() ?? false; // <- Aquí nos aseguramos que no quede undefined

  //   } catch (error) {
  //     valid = false;
  //   }

  //   if (!valid && internalError) {
  //     await this.router.navigate([internalError]);
  //     return false;
  //   }

  //   // console.log(valid);

  //   if (!valid) {
  //     const refreshed = await this.authService.refreshTokenOrLogout(token.refreshToken, state);
  //     return !!refreshed;
  //   }

  //   return true;
  // }


};
