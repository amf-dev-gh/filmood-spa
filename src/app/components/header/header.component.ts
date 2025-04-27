import { Component } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [IconComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  showMenu: boolean = false;

  closeMenu() {
    this.showMenu = false;
  }

  openClose(){
    this.showMenu = !this.showMenu;
  }

}
