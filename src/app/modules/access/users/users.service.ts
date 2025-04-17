import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Users } from './interfaces/user.interfaces';
import { Coordinators } from './interfaces/coordinators.interfaces';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl: string = 'http://localhost/api-php/api';

  constructor( private http: HttpClient, private authService: AuthService ) { }

  searchUsers(page: number = 1, term: string = ''): Observable<Users> {
    let url = `${this.apiUrl}/usuarios?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${this.apiUrl}/usuarios/buscar?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Users>( url );
  }

  seachUser(page: number = 1, term: string = ''): void {}

  createUser(data: any): Observable<any> {

    const url = `${ this.apiUrl }/usuarios`;

    return this.http.post( url, data ).pipe(
      catchError( err => {
        return throwError(() => err);
      })
    );

  }

  updateUser(): void {}

  loadCoodinatorSelect( userId?: string ): Observable<Coordinators> {
    const role = this.authService.getRole();
    const url = `${this.apiUrl}/coordinators`;
    let param = '';
    // console.log(role, 'hola');


    if ( role === 'admin' || role === 'digitador') {


      // Valida si el parametro llego True: llego
      if (userId) {
        param = `?id=${userId}`;
      } else {
        param = '';
      }


    } else {



      // Valida si el parametro llego True: llego
      if (userId) {
        param = `?id=${userId}`;
      } else {
        let userId = this.authService.getUser();
        param = `?id=${userId}`;
      }




    }

    return this.http.get<Coordinators>( `${url}${param}` );
  }

}
