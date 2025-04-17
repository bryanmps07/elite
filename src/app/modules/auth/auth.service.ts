import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ValidateTokenRequest, Response, ValidateToken, RefreshTokenRequest, Token } from './interfaces/index';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'token';
  private readonly ACCESS = 'access';
  private readonly IDENTITY = 'identity';
  private readonly PASSWORD_TOKEN = 'passwordToken';

  // private apiUrl: string = 'http://localhost/api-php/api';
  private apiUrl: string = 'https://linen-hyena-301899.hostingersite.com';
  private tokenKey = 'auth_token';
  public tokenAuth: Token = {} as Token;

  constructor( private http: HttpClient, private router: Router ) {
    this.getToken();
  }

  // Metodo Login
  login(credentials: {document: string, password: string}): Observable<any> {
    const url = `${ this.apiUrl }/login`;
    return this.http.post<any>(url, credentials, {headers});
  }

  isAuthenticated(token: ValidateTokenRequest): Observable<{ valid: boolean }> {
    // console.log('validado');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.http.post<{ valid: boolean }>(
      `${this.apiUrl}/token/validate`,
      {}, // 👈 body vacío
      { headers } // 👈 aquí van los headers de verdad
    ).pipe(
      catchError((error) => {
        console.error('Error al validar el token:', error);
        return of({ valid: false });  // Si hay error, devolvemos "valid: false"
      })
    );

  }

  // Eliminar el token (cuando el usuario se desloguea)
  logout(): void {
    // console.log('saliiiiiii');

    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['auth/login']);
  }

  setRefreshToken(refreshToken: RefreshTokenRequest): Observable<boolean> {
    // console.log('weoooooo');

    return this.http.post<Token>(`${this.apiUrl}/login/refresh`, refreshToken).pipe(
      map(( response ) => {
        // console.log('refresh', response);
        if (!response) {
          throw new Error('Token inválido'); // Esto caerá en el catchError
        }

        this.setToken(response);
        return true;
      }), catchError((error: HttpErrorResponse) => {
        return of(false);
      })
    );
  }

  async refreshTokenOrLogout(refreshToken: string, state: RouterStateSnapshot): Promise<boolean> {
    // console.log('entro al metodo');

    // Asegúrate de que el resultado de setRefreshToken siempre sea un booleano
    const refreshed = await firstValueFrom(
      this.setRefreshToken({ refreshToken }).pipe(
        map(refreshed => {

          // console.log('devuelve estoooooooooo:', refreshed);
          if (!refreshed) {
            // console.log('hola');

            this.logout();
            this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
          }
          return refreshed;
        }),
        catchError(() => of(false))
      )
    );

    // Aseguramos que siempre retornamos un booleano
    return !!refreshed;  // Convierte 'refreshed' a booleano si es necesario
  }



  // Getter and setters from localstorage
  // -----------------------------------------------------------------------------------------------------

  getUser(): number | null {
    const token = this.getToken();
    if (!token || !token.accessToken) return null;

    try {
      const decodedToken: any = jwtDecode(token.accessToken);  // Decodifica el token JWT
      return decodedToken.userId || null;  // Devuelve el rol (por ejemplo, "admin")
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token || !token.accessToken) return null;

    try {
      const decodedToken: any = jwtDecode(token.accessToken);  // Decodifica el token JWT
      return decodedToken.role || null;  // Devuelve el rol (por ejemplo, "admin")
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }

  // Obtener el token de localStorage
  getToken() {

    const tokenString = localStorage.getItem(this.tokenKey);
    if (!tokenString) return null;

    try {
      this.tokenAuth = JSON.parse(tokenString);
      // console.log(this.tokenAuth);

      return this.tokenAuth;
    } catch (error) {
      console.error('Error al parsear el token', error);
      return null;
    }

  }

  // Save Token in localStorage
  setToken(token: Token): any {
    localStorage.setItem(this.tokenKey, JSON.stringify( token ));
  }
}
