import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, UntypedFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { notEmptyValidator } from '../../components/not-empty.validator';
import { UsersService } from '../../users.service';
import { ToastsComponent } from '../../../../../shared/components/toasts/toasts.component';
import { noOnlySpaceValidator } from '../../../../../shared/validators/no-only-space-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user.interfaces';

function matchOtherValidator(otherControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) return null;

    const otherControl = control.parent.get(otherControlName);
    if (!otherControl) return null;

    return control.value === otherControl.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-users-password-form',
  standalone: false,
  templateUrl: './users-password-form.component.html',
  styleUrls: ['./users-password-form.component.css'],
})
export class UsersPasswordFormComponent implements OnInit{
  @ViewChild(ToastsComponent) toastsComponent!: ToastsComponent;
  txtToast: string = '';
  colorToats: string = '';

  formValidated = false;
  browserDefaultsValidated = false;
  tooltipValidated = false;
  isDisabled: boolean = true;

  passwordForm!: FormGroup;
  rol!: FormGroup;

  submitted: boolean = false;

  public userId: string | null = '';

  public user: User[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUserData();

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, noOnlySpaceValidator]],
      confirmPassword: ['', [Validators.required, noOnlySpaceValidator, matchOtherValidator('password')]],
    });


    this.passwordForm.get('password')?.valueChanges.subscribe(() => {
      this.passwordForm.get('confirmPassword')?.updateValueAndValidity();
    });

  }

  loadUserData() {
    if (this.userId) {
      this.usersService.getUserById(this.userId).subscribe(
        (response: User[]) => {
          if (response && response.length > 0) {
            this.user = response;
            // console.log(this.user);

          } else {
            console.warn('No se encontró información del usuario.');
          }
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        });
    }
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      if (this.userId) {
          this.updateUser();
      }
    }
  }

  updateUser() {
    this.formValidated = true;

    if (this.passwordForm.invalid) {
      console.log('Formulario invalido', this.passwordForm.errors);
      this.passwordForm.markAllAsTouched();
      return;
    }

    const userData = this.passwordForm.value;

    this.usersService.updatePassword( this.userId, userData ).subscribe({
      next: (res) => {
        // console.log('Usuario creado', res);
        this.onReset();
        // Mostrar el toast
        this.txtToast = 'Clave actualizada con exito';
        this.colorToats = 'success';
        this.toastsComponent.toggleToast();
        setTimeout(() => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        }, 3000);
      },
      error: (err) => {
        console.log('Error al actualizar la clave', err);

        this.txtToast = err.error;
        this.colorToats = 'danger';
        this.toastsComponent.toggleToast();
      }
    });
    // console.log('Formulario Valido', this.passwordForm.value);
  }

  onReset() {
    this.passwordForm.reset();
    this.formValidated = false;
  }

}
