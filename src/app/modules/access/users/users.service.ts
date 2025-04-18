import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User, Users } from './interfaces/user.interfaces';
import { Coordinators } from './interfaces/coordinators.interfaces';
import { AuthService } from '../../auth/auth.service';
import { environment } from '../../../../environments/environments';

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // private apiUrl: string = 'http://localhost/api-php/api';

  constructor( private http: HttpClient, private authService: AuthService ) { }

  searchUsers(page: number = 1, term: string = ''): Observable<Users> {
    let url = `${apiUrl}/usuarios?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${apiUrl}/usuarios/buscar?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Users>( url );
  }

  getUserById(userId: string): Observable<User[]> {

    return this.http.get<User[]>(
      `${apiUrl}/usuarios/${userId}`
    );
  }

  createUser(data: any): Observable<any> {

    const url = `${ apiUrl }/usuarios`;

    return this.http.post( url, data ).pipe(
      catchError( err => {
        return throwError(() => err);
      })
    );

  }

  updateUser(userId: string | null, userForm: any): Observable<User> {
    // console.log(userForm);

    return this.http.put<User>(
      `${apiUrl}/usuarios/${userId}`, userForm
    );
  }

  activateUser(userId: number | null, status: any): Observable<any> {
    console.log({userId, status});
    const body = { status };
    return this.http.put<any>(
      `${apiUrl}/usuarios/activate/${userId}`, body
    );
  }

  loadCoodinatorSelect( userId?: string ): Observable<Coordinators> {
    const role = this.authService.getRole();
    const url = `${apiUrl}/coordinators`;
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
