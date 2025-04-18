import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Regions } from './interfaces/region.interfaces';
import { environment } from '../../../../environments/environments';

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor( private http: HttpClient ) { }

  searchRegions(page: number = 1, term: string = ''): Observable<Regions> {
    let url = `${apiUrl}/regions?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${apiUrl}/regions?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Regions>( url );
  }

  getRegionsByMunicipalityId(MunicipalityId: string): Observable<Regions> {
      return this.http.get<Regions>(`${apiUrl}/regions/${MunicipalityId}`);
  }

  seachRegion(page: number = 1, term: string = ''): void {}

  createRegion(data: any): void {}

  updateRegion(): void {}

}
