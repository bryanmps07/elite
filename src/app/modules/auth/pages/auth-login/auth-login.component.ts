import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth-login',
  standalone: false,
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
})
export class AuthLoginComponent implements OnInit{
  public loginForm: FormGroup;
  public errorLogin: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
      this.loginForm = this.fb.group({
        document: ['', [Validators.required,]],
        password: ['', [Validators.required]]
      });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {

      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          // console.log('Login successful', response);
          // Guardando el Token en el localStorage
          // console.log(response);

            this.authService.setToken(response);

          // Redirigir a la página principal después del login

          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // console.error('Error al iniciar sesion =>', error.error);
          this.errorLogin = error.error;
        }
      );

    }
  }

}
