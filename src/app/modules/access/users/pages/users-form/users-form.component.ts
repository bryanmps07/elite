import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { notEmptyValidator } from '../../components/not-empty.validator';
import { UsersService } from '../../users.service';
import { ToastsComponent } from '../../../../../shared/components/toasts/toasts.component';
import { ProvincesService } from '../../../../location/provinces/provinces.service';
import { Province } from '../../../../location/provinces/interfaces/province.interfaces';
import { MunipalityService } from '../../../../location/municipality/munipality.service';
import { Municipality } from '../../../../location/municipality/interfaces/municipality.interfaces';
import { Region } from '../../../../location/region/interfaces/region.interfaces';
import { Zone } from '../../../../location/zone/interfaces/zone.interfaces';
import { RegionService } from '../../../../location/region/region.service';
import { ZoneService } from '../../../../location/zone/zone.service';
import { noOnlySpaceValidator } from '../../../../../shared/validators/no-only-space-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-users-form',
  standalone: false,
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent implements OnInit{

  @ViewChild(ToastsComponent) toastsComponent!: ToastsComponent;
  txtToast: string = '';
  colorToats: string = '';

  formValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;
  isDisabled: boolean = true;

  isProvinceReadonly: boolean = true;
  isZoneReadonly: boolean = false;

  userForm!: FormGroup;
  rol!: FormGroup;

  addressContainer: boolean | null = null;

  submitted: boolean = false;

  public userId: string | null = '';

  public provinces: Province[] = [];
  public municipalities: Municipality[] = [];
  public regions: Region[] = [];
  public zones: Zone[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private provinceService: ProvincesService,
    private municipalityService: MunipalityService,
    private regionService: RegionService,
    private zoneService: ZoneService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    // console.log(this.userId);
    this.loadUser();


    this.loadProvinces();
    this.loadMunicipalities();
    this.loadRegions();


    this.userForm = this.fb.group({
      rol: this.fb.group({
        role: ['', Validators.required],
      }),
      document: ['', [Validators.required, notEmptyValidator()]],
      password: ['', Validators.required],
      first_name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), noOnlySpaceValidator] ],
      last_name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/), noOnlySpaceValidator] ],
      phone: ['', Validators.required],
      province: ['1', Validators.required],
      municipality: ['1', Validators.required],
      // district: ['', Validators.required],
      region: ['', Validators.required],
      zone: ['', Validators.required],
    });

    this.userForm.patchValue({
      document: '',  // o algún valor inicial con la máscara aplicada, como '---'
    });

    this.userForm.get('rol.role')?.valueChanges.subscribe((role) => {
      const showAddressFields = role === '3' || role === '5';
      this.toggleAddressFieldValidators(showAddressFields);
    });

    this.rol = this.fb.group({
      role: this.fb.control({ value: 1 }),
    });

  }

  get showAddressContainer(): boolean {
    return this.userForm.get('rol.role')?.value === '3' || this.userForm.get('rol.role')?.value === '5';
  }

  get formAction(): string {
    return this.userId ? 'Editar' : 'Registrar';
  }

  setRadioValue(value: string): void {
    // console.log('set value', value);

    this.rol.setValue({ role: value });
    this.addressContainer = this.rol.value.role;

    if (value === '3') {
      this.isZoneReadonly = true;
      this.userForm.patchValue({zone: ''});
      this.userForm.get('zone')?.clearValidators();
      this.userForm.get('zone')?.disable();
      this.userForm.get('zone')?.updateValueAndValidity();
    } else {
      this.isZoneReadonly = false;
      this.userForm.get('zone')?.setValidators(Validators.required);
      this.userForm.get('zone')?.enable();
      this.userForm.get('zone')?.updateValueAndValidity();
    }
  }

  loadUser(): void {
    if (this.userId) {
      this.usersService.getUserById(this.userId).subscribe(
        (response: User[]) => {
          if (response && response.length > 0) {
            const user = response[0];
            // console.log(user);
            this.getZoneByRegion(user.region?.id?.toString()!);

            this.setRadioValue( user.role?.id?.toString()! );
            // this.rol.setValue({ role: user.role?.id });
            this.userForm.get('rol')?.patchValue({
              role: user.role?.id?.toString() // Asegúrate de que el id del rol sea el valor correcto
            });

            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.disable();
            this.userForm.get('password')?.updateValueAndValidity();

            this.userForm.patchValue({
              document:   user.document,
              first_name: user.first_name,
              last_name:  user.last_name,
              phone:      user.phone,
              province:   user.province?.id,
              municipality: user.municipality?.id,
              region:     user.region?.id,
              zone:       user.zone?.id ?? '',
            });

          } else {
            console.warn('No se encontró información del usuario.');
          }
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.userId) {
          this.updateUser();
      } else {
          this.createUser();
      }
    }
  }

  createUser(): void{
    this.formValidated = true;

    if (this.userForm.invalid) {
      console.log('Formulario invalido', this.userForm.errors);
      this.userForm.markAllAsTouched();
      return;
    }

    const userData = this.userForm.value;

    this.usersService.createUser( userData ).subscribe({
      next: (res) => {
        // console.log('Usuario creado', res);
        this.onReset();
        // Mostrar el toast
        this.txtToast = 'Usuario creado con exito';
        this.colorToats = 'success';
        this.toastsComponent.toggleToast();
      },
      error: (err) => {
        console.log('Error al crear usuario', err);

        this.txtToast = err.error;
        this.colorToats = 'danger';
        this.toastsComponent.toggleToast();
      }
    });
    // console.log('Formulario Valido', this.userForm.value);
  }

  updateUser() {
    this.formValidated = true;

    if (this.userForm.invalid) {
      console.log('Formulario invalido', this.userForm.errors);
      this.userForm.markAllAsTouched();
      return;
    }

    const userData = this.userForm.value;

    this.usersService.updateUser( this.userId, userData ).subscribe({
      next: (res) => {
        // console.log('Usuario creado', res);
        this.onReset();
        // Mostrar el toast
        this.txtToast = 'Usuario actualizado con exito';
        this.colorToats = 'success';
        this.toastsComponent.toggleToast();
        setTimeout(() => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        }, 3000);
      },
      error: (err) => {
        console.log('Error al actualizar el usuario', err);

        this.txtToast = err.error;
        this.colorToats = 'danger';
        this.toastsComponent.toggleToast();
      }
    });
    // console.log('Formulario Valido', this.userForm.value);
  }

  onReset() {
    this.userForm.reset();
    this.formValidated = false;

    this.isProvinceReadonly = false;

    setTimeout(() => {
      this.userForm.patchValue({
        province: '1',
        municipality: '1'
      });
    });

    this.isProvinceReadonly = true;
  }

  toggleAddressFieldValidators(enable: boolean) {
    const controls = ['province', 'municipality', 'district', 'region', 'zone'];

    controls.forEach(field => {
      const control = this.userForm.get(field);
      if (control) {
        if (enable) {
          control.setValidators(Validators.required);
          this.userForm.patchValue({
            province: '1',
            municipality: '1'
          });
        } else {
          control.clearValidators();
          control.setValue('');
        }
        control.updateValueAndValidity();
      }
    });
  }

  loadProvinces(): void {
    this.provinceService.searchProvinces()
    .subscribe( response => {
      this.provinces = response.data;
    });
  }

  onProvinciaChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.municipalityService.getMunicipalitiesByProvince(selectedValue)
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
  }

  loadMunicipalities(): void {
    this.municipalityService.searchMunicipalities()
    .subscribe( response => {
      this.municipalities = response.data;
    });
  }

  onMunicipalityChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.regionService.getRegionsByMunicipalityId(selectedValue)
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

  loadRegions(): void {
    this.regionService.searchRegions()
    .subscribe( response => {
      this.regions = response.data;
    });
  }

  onRegionChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;

    this.zoneService.getZonesByRegionId(selectedValue)
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
        this.zones = response.data;
        // console.log('Municipios:', this.municipalities);
      } else {
        console.error('La respuesta no tiene un arreglo válido de zonas:', response);
      }
    }, error => {
      console.error('Error al obtener las zonas:', error);
    });
  }


}
