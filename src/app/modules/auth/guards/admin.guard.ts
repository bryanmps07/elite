import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.getToken();
    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated({token: token?.accessToken ?? ''})) {
      this.router.navigate(['auth/login']);
      return false;
    }

    // Verificar si el rol del usuario es 'admin'
    const role = this.authService.getRole();
    if (role !== 'admin') {
      this.router.navigate(['dashboard']);  // Redirige si no es admin
      return false;
    }

    return true;  // Permitir acceso si el rol es admin
  }
}
