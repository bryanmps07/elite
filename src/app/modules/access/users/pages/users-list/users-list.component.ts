import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { Pagination, User } from '../../interfaces/user.interfaces';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit{

  public users: User[] = [];
  public pagination! : Pagination;
  public currentPage: number = 1;
  public initialValue: string = '';

  constructor( private userService: UsersService) {

  }

  ngOnInit(): void {
    this.loadUsers();
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
        // console.log(this.users);

        // Asignar la paginación
        this.pagination = response.pagination;
        this.currentPage = response.pagination.current_page;
        // console.log(this.pagination);
      });


  }





}
