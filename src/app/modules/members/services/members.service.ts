import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Member, Members } from '../interfaces/member.interfaces';
import { environment } from '../../../../environments/environments';

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor( private http: HttpClient, private authService: AuthService ) { }

  createMember(data: any): Observable<any> {
    const url = `${ apiUrl }/members`;

    return this.http.post( url, data ).pipe(
      catchError( err => {
        return throwError(() => err);
      })
    );
  }

  updateMember(memberId: string | null, memberForm: any): Observable<Member | null> {
    const url = `${ apiUrl }/members`;

    return this.http.put<Member | null>( `${url}/${memberId}`, memberForm ).pipe(
      catchError( err => throwError(() => err))
    );
  }

  searchMembers( params: {
    page: number;
    search: string;
    coordinator_id?: string;
    region_id?: string;
    zone_id?: string;
  }): Observable<Members> {
      let url = `${apiUrl}/members`;
      let httpParams = new HttpParams();

      if (params.page) httpParams = httpParams.set('page', params.page.toString());
      if (params.search) httpParams = httpParams.set('q', params.search);
      if (params.coordinator_id) httpParams = httpParams.set('coordinator_id', params.coordinator_id);
      if (params.region_id) httpParams = httpParams.set('region_id', params.region_id);
      if (params.zone_id) httpParams = httpParams.set('zone_id', params.zone_id);

      return this.http.get<Members>( url, {params: httpParams} );
  }

  getMemberById(memberId: string): Observable<Member[]> {

    return this.http.get<Member[]>(
      `${apiUrl}/members/${memberId}`
    );
  }
}
