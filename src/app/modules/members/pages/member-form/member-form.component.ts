import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { notEmptyValidator } from '../../../access/users/components/not-empty.validator';
import { ProvincesService } from '../../../location/provinces/provinces.service';
import { MunipalityService } from '../../../location/municipality/munipality.service';
import { RegionService } from '../../../location/region/region.service';
import { ZoneService } from '../../../location/zone/zone.service';
import { Province } from '../../../location/provinces/interfaces/province.interfaces';
import { Municipality } from '../../../location/municipality/interfaces/municipality.interfaces';
import { Region } from '../../../location/region/interfaces/region.interfaces';
import { Zone } from '../../../location/zone/interfaces/zone.interfaces';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../../access/users/interfaces/user.interfaces';
import { UsersService } from '../../../access/users/users.service';
import { catchError, of } from 'rxjs';
import { ToastsComponent } from '../../../../shared/components/toasts/toasts.component';
import { MembersService } from '../../services/members.service';
import { noOnlySpaceValidator } from '../../../../shared/validators/no-only-space-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../interfaces/member.interfaces';

@Component({
  selector: 'app-member-form',
  standalone: false,
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css'],
})
export class MemberFormComponent  implements OnInit {

  @ViewChild(ToastsComponent) toastsComponent!: ToastsComponent;
  txtToast: string = '';
  colorToats: string = '';

  // customStylesValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;

  role: any = '';
  userId: any = '';

  formValidated = false;

  memberForm!: FormGroup;
  genders!: FormGroup;

  isReadonly: boolean = true;
  isReadonlyForCoordinator: boolean = false;
  isReadonlyForCoordinatorZone: boolean = false;

  submitted: boolean = false;

  public coordinators: User[] = [];
  public selectCoordinator: User[] = [];

  public provinces: Province[] = [];
  public municipalities: Municipality[] = [];
  public regions: Region[] = [];
  public zones: Zone[] = [];

  public memberId: string | null = '';

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private provinceService: ProvincesService,
    private municipalityService: MunipalityService,
    private regionService: RegionService,
    private zoneService: ZoneService,
    private membersService: MembersService
  ) { }

  ngOnInit(): void {
    this.memberId = this.route.snapshot.paramMap.get('id');
    this.loadMember();

    this.getUserId();
    this.loadProvinces();
    this.loadMunicipalities();
    this.loadRegions();
    // this.loadZones();

    this.loadCoordinator();

    this.memberForm = this.fb.group({
      document: ['', [Validators.required, notEmptyValidator()]],
      first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), noOnlySpaceValidator] ],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), noOnlySpaceValidator] ],
      nick_name: [''],
      phone: ['', Validators.required],
      cell_phone: [''],
      genders: this.fb.group({
        gender: ['', Validators.required],
      }),
      electoral_college: ['', Validators.required],
      campus_college: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), noOnlySpaceValidator] ],
      address: ['', Validators.required],
      coordinator: [this.role === 'admin' || this.role === 'digitador' ? '' : this.userId, Validators.required],
      province: ['', Validators.required],
      municipality: ['', Validators.required],
      distritc: [''],
      circumscription: [''],
      region: ['', Validators.required],
      zone: ['', Validators.required]
    });

    if (this.role != 'admin' && this.role != 'digitador') {
      this.isReadonlyForCoordinator = true;
      this.onCoordinatorChange({target: {value: this.userId} } as any);
    }

    if (this.role === 'admin' || this.role === 'digitador') {
      this.memberForm.patchValue({
        province: '1',
        municipality: '1'
      });
    }

    if (this.role === 'coordinador de zona') {
      this.isReadonlyForCoordinatorZone = true;
    }


    this.memberForm.patchValue({
      document: '',  // o algún valor inicial con la máscara aplicada, como '---'
    });

  }

  get formAction(): string {
    return this.userId ? 'Editar' : 'Registrar';
  }

  loadMember(): void {
    if (this.memberId) {
      this.membersService.getMemberById(this.memberId).subscribe(
        (response: Member[]) => {
          if (response && response.length > 0) {
            const member = response[0];

            this.getZoneByRegion(member.region?.id.toString()!);

            this.memberForm.get('genders')?.patchValue({
              gender: member.gender // Asegúrate de que el id del rol sea el valor correcto
            });

            this.memberForm.patchValue({
              document:   member.document,
              first_name: member.first_name,
              last_name:  member.last_name,
              nick_name:  member.nick_name,
              phone:      member.phone,
              cell_phone: member.cell_phone,
              electoral_college: member.electoral_college,
              campus_college: member.campus_college,
              address: member.address,
              coordinator: member.register?.coordinator_id,
              province:   member.province?.id,
              municipality: member.municipality?.id,
              region:     member.region?.id,
              zone:       member.zone?.id.toString() ?? '',
            });

          } else {
            console.warn('No se encontró información del miembro.');
          }
        },
        (error) => {
          console.error('Error al obtener el miembro:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.memberForm.valid) {
      if (this.memberId) {
          this.updateMember();
      } else {
          this.createMember();
      }
    }
  }

  createMember(): void {
    this.formValidated = true;

    if (this.memberForm.invalid) {
      console.log('Formulario invalido', this.memberForm.errors);
      this.memberForm.markAllAsTouched();
      return;
    }
    const MemberData = this.memberForm.value;

    this.membersService.createMember( MemberData ).subscribe({
      next: (res) => {
        // console.log('Usuario creado', res);
        this.onReset();
        // Mostrar el toast
        this.txtToast = 'Miembro creado con exito';
        this.colorToats = 'success';
        this.toastsComponent.toggleToast();
      },
      error: (err) => {
        console.log('Error al crear Miembro', err);

        this.txtToast = err.error;
        this.colorToats = 'danger';
        this.toastsComponent.toggleToast();
      }
    });
    // console.log('Submit... 1', userData);
  }

  updateMember(): void {
    this.formValidated = true;

    if (this.memberForm.invalid) {
      console.log('Formulario invalido', this.memberForm.errors);
      this.memberForm.markAllAsTouched();
      return;
    }
    const memberData = this.memberForm.value;
    // console.log(memberData);


    this.membersService.updateMember( this.memberId, memberData ).subscribe({
      next: (res) => {
        // console.log('Usuario creado', res);
        this.onReset();
        // Mostrar el toast
        this.txtToast = 'Miembro actualizado con exito';
        this.colorToats = 'success';
        this.toastsComponent.toggleToast();

        setTimeout(() => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        }, 2000);
      },
      error: (err) => {
        console.log('Error al actualizar Miembro', err);

        this.txtToast = `Error => ${err.error}`;
        this.colorToats = 'danger';
        this.toastsComponent.toggleToast();
      }
    });
    // console.log('Submit... 1', userData);
  }

  onReset() {
    // this.memberForm.reset();
    this.formValidated = false;

    // this.isReadonly = false;

    setTimeout(() => {
      this.memberForm.patchValue({
        document: '',
        first_name: '',
        last_name: '',
        nick_name: '',
        phone: '',
        cell_phone: '',
        genders: this.fb.group({
          gender: '',
        }),
        electoral_college: '',
        campus_college: '',
        address: '',
        coordinator: this.role === 'admin' || this.role === 'digitador' ? '' : this.userId,
      });
    });
    // console.log('Reset...');
    this.memberForm.markAsUntouched();
  }

  getUserId(): void {
    this.userId = this.authService.getUser();
    this.role = this.authService.getRole();
    // console.log(this.role);
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

  onCoordinatorChange(event: Event): void {
    const selectedValue = (event?.target as HTMLSelectElement).value;

    if (!selectedValue) return
    // console.log(selectedValue);

    this.userService.loadCoodinatorSelect(
      this.role === 'admin' || this.role === 'digitador' ? selectedValue : this.userId
     ).subscribe(response => {
      if (response && response.data) {  // Verifica que la respuesta contenga la propiedad 'data'
        this.selectCoordinator = response.data;  // 'data' es un arreglo de 'User[]'
        // console.log(this.selectCoordinator[0]);  // Imprime para verificar

        // if(this.selectCoordinator[0].rol)

        this.memberForm.patchValue({ province: this.selectCoordinator[0].province?.id ?? '1' });

        !!this.selectCoordinator[0].province?.id ?
              this.loadProvinceChange(this.selectCoordinator[0].province?.id.toString()) : '1';

        !!this.selectCoordinator[0].municipality?.id ?
              this.loadMunicipalityChange(this.selectCoordinator[0].municipality?.id.toString()) : '';

        !!this.selectCoordinator[0].region?.id ?
              this.loadRegionChange(this.selectCoordinator[0].region?.id.toString()) : this.zones = [];

        // console.log('province', this.selectCoordinator[0]?.municipality?.id);


        // if (this.memberForm.get('province')?.value === this.selectCoordinator[0].province?.id?.toString()) {
          //   console.log('si');

          // }

          setTimeout(() => {

            this.memberForm.patchValue({
              municipality: this.selectCoordinator[0].municipality?.id ?? '1',
              region: this.selectCoordinator[0].region?.id ?? '',
              zone: this.selectCoordinator[0].zone?.id ?? ''
            });
          }, 300);

        // console.log(this.memberForm.get('municipality')?.value);



      } else {
        console.error('No coordinators found in the response.');
      }
    }, error => {
      console.error('Error loading coordinators', error);  // Maneja el error adecuadamente
    });
  }



  loadProvinces(): void {
    this.provinceService.searchProvinces()
    .subscribe( response => {
      this.provinces = response.data;
    });
  }

  loadProvinceChange(provinceId: string): void {

    this.municipalityService.getMunicipalitiesByProvince(provinceId)
      .subscribe( response => {
       // Asigna la propiedad 'data' que contiene el arreglo de municipios
      if (response && response.data && Array.isArray(response.data)) {
        this.municipalities = response.data;
        // console.log('Municipios:', this.municipalities);
      } else {
        console.error('La respuesta no tiene un arreglo válido de municipios:', response);
      }
    }, error => {
      console.error('Error al obtener los municipios:', error);
    });

      this.memberForm.patchValue({
        // municipality: '1',
        // region: '',
        // zone: ''
      });

  }

  onProvinciaChange(event: Event, manual?: string) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    // console.log(manual);
    this.memberForm.patchValue({
      municipality: '',
      region: '',
      zone: '',
    });
    this.municipalities = [];
    this.regions = [];
    this.zones = [];
    this.loadProvinceChange(selectedValue);
  }

  loadMunicipalities(): void {
    this.municipalityService.searchMunicipalities()
    .subscribe( response => {
      this.municipalities = response.data;
    });
  }

  loadMunicipalityChange(municipalityId: string): void {

    this.regionService.getRegionsByMunicipalityId(municipalityId)
      .subscribe( response => {
       // Asigna la propiedad 'data' que contiene el arreglo de region
      if (response && response.data && Array.isArray(response.data)) {
        this.regions = response.data;
        // console.log('Municipios:', this.municipalities);
      } else {
        console.error('La respuesta no tiene un arreglo válido de regiones:', response);
      }
    }, error => {
      console.error('Error al obtener las regiones:', error);
    });

  }

  onMunicipalityChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.memberForm.patchValue({
      region: '',
      zone: ''
    });
    this.regions = [];
    this.zones = [];
    this.loadMunicipalityChange(selectedValue);

  }

  loadRegions(): void {
    this.regionService.searchRegions()
    .subscribe( response => {
      this.regions = response.data;
    });
  }

  loadRegionChange(regionId: string | number): void {

    this.zoneService.getZonesByRegionId(regionId)
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

  onRegionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.memberForm.patchValue({
      zone: ''
    });
    this.zones = [];
    this.loadRegionChange(selectedValue);


  }

  loadZones(): void {
    this.zoneService.searchZones()
    .subscribe( response => {
      this.zones = response.data;
    });
  }

  getZoneByRegion(regionId: string): void {
    // console.log(regionId);

    this.zoneService.getZonesByRegionId(regionId)
      .subscribe( response => {
       // Asigna la propiedad 'data' que contiene el arreglo de region
      if (response && response.data && Array.isArray(response.data)) {
        this.zones = response.data
      } else {
        console.error('La respuesta no tiene un arreglo válido de zonas:', response);
      }
    }, error => {
      console.error('Error al obtener las zonas:', error);
    });
  }



}
