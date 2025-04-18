import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from '../../../modules/auth/auth.service';
import { User } from '../../../modules/access/users/interfaces/coordinators.interfaces';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  public user: { userName: string; role: string } | null = null;

  constructor(private classToggler: ClassToggleService, private authService: AuthService) {
    super();
    this.getUset();
  }

  logout(): void {
    // console.log('hola');

    this.authService.logout();
  }

  getUset(): void {
    this.user = this.authService.getUserNameAndRole();
  }
}
