import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Zones } from './interfaces/zone.interfaces';
import { environment } from '../../../../environments/environments';

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor( private http: HttpClient ) { }

  searchZones(page: number = 1, term: string = ''): Observable<Zones> {
    let url = `${apiUrl}/zones?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${apiUrl}/zones?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Zones>( url );
  }

  getZonesByRegionId(RegionId: number | string): Observable<Zones> {
        return this.http.get<Zones>(`${apiUrl}/zones/${RegionId}`);
    }

  seachZone(page: number = 1, term: string = ''): void {}

  createZone(data: any): void {}

  updateZone(): void {}

}
