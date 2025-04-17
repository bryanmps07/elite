import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provinces } from './interfaces/province.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {

  // private apiUrl: string = 'http://localhost/api-php/api';
  private apiUrl: string = 'https://linen-hyena-301899.hostingersite.com';

  constructor( private http: HttpClient ) { }

  searchProvinces(page: number = 1, term: string = ''): Observable<Provinces> {
    let url = `${this.apiUrl}/provinces?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${this.apiUrl}/provinces?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Provinces>( url );
  }

  seachProvince(page: number = 1, term: string = ''): void {}

  createProvince(data: any): void {}

  updateProvince(): void {}

}
