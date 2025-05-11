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
import { IconSetService } from '@coreui/icons-angular';
import { cilCloudDownload, cilPencil } from '@coreui/icons';
import { saveAs } from 'file-saver';

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
  public showDownload: boolean = false;

  public coordinators: User[] = [];
  public selectCoordinator: string = '';

  public regions: Region[] = [];
  public selectRegion: Region[] = [];

  public zones: Zone[] = [];
  public selectZones: number | string = '';

  public regionSeleccionada: number | string = '';

  public newSeleccionado: number | string = '';

  constructor(
    private membersService: MembersService,
    private authService: AuthService,
    private userService: UsersService,
    private regionService: RegionService,
    private zoneService: ZoneService,
    private iconSet: IconSetService
  ) {
    this.showSelectByRole();
    this.iconSet.icons = { cilPencil, cilCloudDownload };
  }


  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(page: number = 1, term: string = '', coordinatorId: string = '', regionId: string = '', zoneId: string = '', newId: string = ''): void {

    if (term != '') {
      this.initialValue = term;
    } else {
      this.initialValue = '';
    }

    this.membersService.searchMembers({
      page,
      search: term,
      coordinator_id: coordinatorId,
      region_id: regionId,
      zone_id: zoneId,
      new_id: newId
    })
      .subscribe( response => {  // Asegúrate de que la respuesta sea de tipo 'Users'
        this.members = response.data;  // 'data' es un arreglo de 'User[]'
        // console.log(this.members);

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

    if ( this.role === 'admin' ) {
      this.showDownload = true;
    }
  }

  loadCoordinator(): void {
    this.loadZones();
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
    this.loadMembers(
            this.currentPage,
            this.initialValue,
            this.selectCoordinator,
            this.regionSeleccionada.toString(),
            this.selectZones.toString(),
            this.newSeleccionado.toString()
          );
  }

  loadRegions(): void {
    this.regionService.searchRegions()
    .subscribe( response => {
      this.regions = response.data;
    });
  }

  onRegionChange(value: string): void {
    this.regionSeleccionada = value;
    this.loadZoneSelected(value);
    this.loadMembers(this.currentPage, this.initialValue, this.selectCoordinator, this.regionSeleccionada.toString(), this.selectZones.toString(), this.newSeleccionado.toString());
  }

  loadZones(value: string = ''): void {
    this.zoneService.searchZones()
    .subscribe( response => {
      this.zones = response.data;
    });
  }

  loadZoneSelected(value: string): void {
    this.zoneService.getZonesByRegionId(value)
      .subscribe( response => {
       // Asigna la propiedad 'data' que contiene el arreglo de region
      if (response && response.data && Array.isArray(response.data)) {
        this.zones = response.data;
        // console.log('Municipios:', this.municipalities);
      } else {
        console.error('La respuesta no tiene un arreglo válido de zonas:', response);
      }
    }, error => {
      console.error('Error al obtener las zonas:', error);
    });
  }

  onZoneChange(value: string): void {
    this.selectZones = value;
    // console.log(value);

    this.loadMembers(this.currentPage, this.initialValue, this.selectCoordinator, this.regionSeleccionada.toString(), this.selectZones.toString(), this.newSeleccionado.toString());
  }

  onNewChange(value: string): void {
    this.newSeleccionado = value;
    // console.log(value);

    this.loadMembers(this.currentPage, this.initialValue, this.selectCoordinator, this.regionSeleccionada.toString(), this.selectZones.toString(), this.newSeleccionado.toString());
  }

  onDownloadExcel(term: string = '', coordinatorId: string = '', regionId: string = '', zoneId: string = ''): void {
    // console.log('descarga');

    this.membersService.getDataToDownloadMembers({
      search: this.initialValue,
      coordinator_id: this.selectCoordinator,
      region_id: this.regionSeleccionada.toString(),
      zone_id: this.selectZones.toString(),
      new_id: this.newSeleccionado.toString()
    }).subscribe(
        (response: Blob) => {
        // Crea un enlace temporal para la descarga del archivo
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(response);
        a.href = url;
        a.download = 'miembros.xlsx'; // Nombre del archivo descargado
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Limpiar la URL creada
      },
      (error) => {
        console.error('Error al descargar el archivo:', error);
      }
    );

  }


}
