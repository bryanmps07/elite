import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Zones } from './interfaces/zone.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  // private apiUrl: string = 'http://localhost/api-php/api';
  private apiUrl: string = 'https://linen-hyena-301899.hostingersite.com';

  constructor( private http: HttpClient ) { }

  searchZones(page: number = 1, term: string = ''): Observable<Zones> {
    let url = `${this.apiUrl}/zones?page=${page}`;

    if (term != '') {
      // console.log('hola',term);
      url = `${this.apiUrl}/zones?q=${encodeURIComponent(term)}&page=${page}`;
    }

    return this.http.get<Zones>( url );
  }

  getZonesByRegionId(RegionId: string): Observable<Zones> {
        return this.http.get<Zones>(`${this.apiUrl}/zones/${RegionId}`);
    }

  seachZone(page: number = 1, term: string = ''): void {}

  createZone(data: any): void {}

  updateZone(): void {}

}
