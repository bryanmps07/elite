import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipalities, Municipality } from './interfaces/municipality.interfaces';
import { environment } from '../../../../environments/environments';

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class MunipalityService {

  constructor( private http: HttpClient ) { }

  searchMunicipalities(page: number = 1, term: string = ''): Observable<Municipalities> {
    let url = `${apiUrl}/municipalities?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${apiUrl}/municipalities?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Municipalities>( url );
  }

  getMunicipalitiesByProvince(provinceId: string): Observable<Municipalities> {
    return this.http.get<Municipalities>(`${apiUrl}/municipalities/${provinceId}`);
  }

  seachMunicipality(page: number = 1, term: string = ''): void {}

  createMunicipality(data: any): void {}

  updateMunicipality(): void {}

}
