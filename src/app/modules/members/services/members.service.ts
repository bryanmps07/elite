import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Members } from '../interfaces/member.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  // private apiUrl: string = 'http://localhost/api-php/api';
  private apiUrl: string = 'https://linen-hyena-301899.hostingersite.com';

  constructor( private http: HttpClient, private authService: AuthService ) { }


  createMember(data: any): Observable<any> {

    const url = `${ this.apiUrl }/members`;

    return this.http.post( url, data ).pipe(
      catchError( err => {
        return throwError(() => err);
      })
    );

  }

  searchMembers( params: {
    page: number;
    search: string;
    coordinator_id?: string;
    region_id?: string;
    zone_id?: string;
  }): Observable<Members> {
      let url = `${this.apiUrl}/members`;
      let httpParams = new HttpParams();

      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.search) httpParams = httpParams.set('q', params.search);
      if (params.coordinator_id) httpParams = httpParams.set('coordinator_id', params.coordinator_id);
      if (params.region_id) httpParams = httpParams.set('region_id', params.region_id);
      if (params.zone_id) httpParams = httpParams.set('zone_id', params.zone_id);

      return this.http.get<Members>( url, {params: httpParams} );
    }
}
