import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Regions } from './interfaces/region.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  // private apiUrl: string = 'http://localhost/api-php/api';
  private apiUrl: string = 'https://linen-hyena-301899.hostingersite.com';

  constructor( private http: HttpClient ) { }

  searchRegions(page: number = 1, term: string = ''): Observable<Regions> {
    let url = `${this.apiUrl}/regions?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${this.apiUrl}/regions?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Regions>( url );
  }

  getRegionsByMunicipalityId(MunicipalityId: string): Observable<Regions> {
      return this.http.get<Regions>(`${this.apiUrl}/regions/${MunicipalityId}`);
  }

  seachRegion(page: number = 1, term: string = ''): void {}

  createRegion(data: any): void {}

  updateRegion(): void {}

}
