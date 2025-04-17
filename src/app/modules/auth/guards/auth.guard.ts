import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Response, ValidateToken } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.validate(state);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.validate(state);
  }

  private async validate(state: RouterStateSnapshot): Promise<boolean> {
    // console.log('validate');

    let internalError: string | null = null;

    const token = this.authService.getToken();
    // console.log('tokencito', token);

    if (!token) {
      // console.log('noooooooooooooo');

      this.authService.logout();
      this.router.navigate(['auth/login'])
      return false;
    }

    let valid: boolean = false;

    try {
      const response = await firstValueFrom(
        this.authService.isAuthenticated({ token: token.accessToken }).pipe(
          catchError((error: HttpErrorResponse) => {
            internalError = 'auth/login';
            console.log('Error validando token:', error);
            return of({ valid: false });  // Si hay error, devolvemos "valid: false"
          })
        )
      );
      // console.log('Respuesta completa de la API:', response);


      valid = response.valid === true;
      // console.log('Token validado:', valid);

    } catch (error) {
      valid = false;
      console.log('Excepción durante validación:', error);
    }

    // if (!valid && internalError) {
    //   await this.router.navigate([internalError]);
    //   return false;
    // }

    // console.log(valid);

    if (!valid) {
      // console.log('Token inválido. Intentando refrescar...');

      const refreshed = await this.authService.refreshTokenOrLogout(token.refreshToken, state);
      // console.log('devuelve el refres:',refreshed);

      if (!refreshed) {
        // console.log('hola');

        await this.router.navigate(['auth/login']);
        return false;
      }
      return true;
    }

    return true;
  }


};
