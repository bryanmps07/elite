import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../users.service';
import { Pagination, User } from '../../interfaces/user.interfaces';
import { AuthService } from '../../../../auth/auth.service';
import { IconSetService } from '@coreui/icons-angular';
import { cilPencil, cilBan, cilCheckCircle, cilLockLocked  } from '@coreui/icons';
import { ToastsComponent } from '../../../../../shared/components/toasts/toasts.component';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit{

  @ViewChild(ToastsComponent) toastsComponent!: ToastsComponent;
  txtToast: string = '';
  colorToats: string = '';

  public users: User[] = [];
  public pagination! : Pagination;
  public currentPage: number = 1;
  public initialValue: string = '';

  public role: string | null = '';
  // icons = freeSet;

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    public iconSet: IconSetService
  ) {
    this.iconSet.icons = { cilPencil, cilBan, cilCheckCircle, cilLockLocked };
  }

  ngOnInit(): void {
    this.loadUsers();
    this.getRole();
  }

  getRole(): void {
    this.role = this.authService.getRole();
  }

  loadUsers(page: number = 1, term: string = ''): void {

    if (term != '') {
      this.initialValue = term;
    } else {
      this.initialValue = '';

    }

    // if (term === '' && page > 1) {
    //   page = 1;
    // }

    this.userService.searchUsers( page, term )
      .subscribe( response => {  // Asegúrate de que la respuesta sea de tipo 'Users'
        this.users = response.data;  // 'data' es un arreglo de 'User[]'
        // console.log(response);

        // Asignar la paginación
        this.pagination = response.pagination;
        this.currentPage = response.pagination.current_page;
        // console.log(this.pagination);
      });


  }

  activateUser(userId: number, status: number): void {
    // console.log({userId, status});

    this.userService.activateUser( userId, status ).subscribe({
      next: (res) => {
        // console.log('Usuario creado', res);
        // Mostrar el toast
        if (status === 1) {
          this.txtToast = 'Usuario desactivado con exito';
        } else {
          this.txtToast = 'Usuario activado con exito';
        }
        this.colorToats = 'success';
        this.toastsComponent.toggleToast();
        this.loadUsers();
      },
      error: (err) => {
        console.log('Error al actualizar el usuario', err);

        this.txtToast = err.error;
        this.colorToats = 'danger';
        this.toastsComponent.toggleToast();
      }
    });
  }





}
