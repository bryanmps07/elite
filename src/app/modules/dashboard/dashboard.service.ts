import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Dashboard } from './interfaces/dashboard.interfaces';
import { environment } from '../../../environments/environments';
import { Observable } from 'rxjs';

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  loadDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>( `${apiUrl}/dashboard` );
  }

}
