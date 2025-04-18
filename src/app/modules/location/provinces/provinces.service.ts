import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provinces } from './interfaces/province.interfaces';
import { environment } from '../../../../environments/environments';

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {

  constructor( private http: HttpClient ) { }

  searchProvinces(page: number = 1, term: string = ''): Observable<Provinces> {
    let url = `${apiUrl}/provinces?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${apiUrl}/provinces?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Provinces>( url );
  }

  seachProvince(page: number = 1, term: string = ''): void {}

  createProvince(data: any): void {}

  updateProvince(): void {}

}
