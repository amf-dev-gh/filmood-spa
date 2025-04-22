import { Component, inject } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [IconComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showMenu: boolean = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly isAuthenticated = this.authService.$isAuthenticated;

  closeMenu() {
    this.showMenu = false;
  }

  openClose(){
    this.showMenu = !this.showMenu;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
