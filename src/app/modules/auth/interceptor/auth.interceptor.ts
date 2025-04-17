// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService // si usas toastr para alertas
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.tokenAuth;
    // Si el token existe, lo agregamos en el header
    if (token && token.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
    }
    // console.log('pasa');


    // Continuamos con la request, pero escuchamos por errores
    return next.handle(request).pipe(

      catchError((error: HttpErrorResponse) => {
        // Si es error 401 (no autorizado)
        if (error.status === 401) {
          // Limpiamos el token y redirigimos al login
          this.authService.logout();
          this.toastr.warning('Tu sesión ha expirado. Por favor inicia sesión nuevamente.');
          setTimeout(() => {
            this.router.navigate(['auth/login']);
          }, 3000);
          return throwError(() => error.error);
        }

        // También podrías manejar otros códigos como 403 (Forbidden)
        if (error.status === 403) {
          console.warn('No tienes permisos suficientes');
        }

        if (error.status === 404) {
          this.toastr.error('Recurso no encontrado.');
        }

        // Manejo de error genérico para otros códigos
        if (error.status >= 500) {
          this.toastr.error('Hubo un error en el servidor. Por favor intenta nuevamente.');
        }

        return throwError(() => error.error); // Propagamos el error
      })

    );

  }


}
