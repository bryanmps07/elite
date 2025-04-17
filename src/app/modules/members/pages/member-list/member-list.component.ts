import { Component } from '@angular/core';
import { MembersService } from '../../services/members.service';
import { Pagination } from '../../../access/users/interfaces/user.interfaces';
import { Member, Members } from '../../interfaces/member.interfaces';
import { AuthService } from '../../../auth/auth.service';
import { UsersService } from '../../../access/users/users.service';
import { User } from '../../../access/users/interfaces/coordinators.interfaces';
import { Region } from '../../../location/region/interfaces/region.interfaces';
import { Zone } from '../../../location/zone/interfaces/zone.interfaces';
import { RegionService } from '../../../location/region/region.service';
import { ZoneService } from '../../../location/zone/zone.service';

@Component({
  selector: 'app-member-list',
  standalone: false,
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {

  public members: Member[] = [];
  public pagination! : Pagination;
  public currentPage: number = 1;
  public initialValue: string = '';

  public role: string | null = '';
  public showSelects: boolean = false;

  public coordinators: User[] = [];
  public selectCoordinator: string = '';

  public regions: Region[] = [];
  public selectRegion: Region[] = [];

  public zones: Zone[] = [];
  public selectZones: number | string = '';

  regionSeleccionada: number | string = '';

  constructor(
    private membersService: MembersService,
    private authService: AuthService,
    private userService: UsersService,
    private regionService: RegionService,
    private zoneService: ZoneService
  ) {
    this.showSelectByRole();
  }


  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(page: number = 1, term: string = '', coordinatorId: string = '', regionId: string = '', zoneId: string = ''): void {

    if (term != '') {
      this.initialValue = term;
    } else {
      this.initialValue = '';
    }

    // if (term === '' && page > 1) {
    //   page = 1;
    // }

    this.membersService.searchMembers({
      page,
      search: term,
      coordinator_id: coordinatorId,
      region_id: regionId,
      zone_id: zoneId
    })
      .subscribe( response => {  // Asegúrate de que la respuesta sea de tipo 'Users'
        this.members = response.data;  // 'data' es un arreglo de 'User[]'
        // console.log(this.users);

        // Asignar la paginación
        this.pagination = response.pagination;
        this.currentPage = response.pagination.current_page;
        // console.log(this.pagination);
      });

  }

  showSelectByRole(): void {
    this.role = this.authService.getRole();

    if ( this.role === 'admin' || this.role === 'digitador') {
      this.showSelects = true;
      this.loadCoordinator();
      this.loadRegions();
    }
  }

  loadCoordinator(): void {
    this.userService.loadCoodinatorSelect().subscribe(response => {
      if (response && response.data) {  // Verifica que la respuesta contenga la propiedad 'data'
        this.coordinators = response.data;  // 'data' es un arreglo de 'User[]'
      } else {
        console.error('No coordinators found in the response.');
      }
    }, error => {
      console.error('Error loading coordinators', error);  // Maneja el error adecuadamente
    });
  }

  onCoordinatorChange(value: string): void {
    this.selectCoordinator = value;
    this.loadZones(); // ya estás haciéndolo
    this.loadMembers(this.currentPage, this.initialValue, this.selectCoordinator, this.regionSeleccionada.toString(), this.selectZones.toString());
  }

  loadRegions(): void {
    this.regionService.searchRegions()
    .subscribe( response => {
      this.regions = response.data;
    });
  }

  onRegionChange(value: string): void {
    this.regionSeleccionada = value;
    this.loadZones();
    this.loadMembers(this.currentPage, this.initialValue, this.selectCoordinator, this.regionSeleccionada.toString(), this.selectZones.toString());
  }

  loadZones(): void {
    this.zoneService.searchZones()
    .subscribe( response => {
      this.zones = response.data;
    });
  }

  onZoneChange(value: string): void {
    this.selectZones = value;
    this.loadMembers(this.currentPage, this.initialValue, this.selectCoordinator, this.regionSeleccionada.toString(), this.selectZones.toString());
  }


}
