import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { AuthService } from '../../modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  public userRole: string | null = '';

  constructor( private authService: AuthService, private router: Router ) {}

  ngOnInit(): void {
    // Verificar el rol del usuario al inicio
    this.userRole = this.authService.getRole();
    // console.log(this.userRole);


    // Filtrar los elementos del menú según el rol
    this.filterNavItems();
  }

  // Filtrar los items del menú en función de los roles
  filterNavItems(): void {
    this.navItems = this.navItems.filter(item => {
      if (!item.roles) return true; // Si no hay roles definidos, lo mostramos
      // Si userRole no es null, filtrar con includes
      return this.userRole && item.roles.includes(this.userRole);
    });
  }







}
