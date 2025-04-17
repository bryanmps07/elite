import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipalities, Municipality } from './interfaces/municipality.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MunipalityService {

  private apiUrl: string = 'http://localhost/api-php/api';

  constructor( private http: HttpClient ) { }

  searchMunicipalities(page: number = 1, term: string = ''): Observable<Municipalities> {
    let url = `${this.apiUrl}/municipalities?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${this.apiUrl}/municipalities?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Municipalities>( url );
  }

  getMunicipalitiesByProvince(provinceId: string): Observable<Municipalities> {
    return this.http.get<Municipalities>(`${this.apiUrl}/municipalities/${provinceId}`);
  }

  seachMunicipality(page: number = 1, term: string = ''): void {}

  createMunicipality(data: any): void {}

  updateMunicipality(): void {}

}
