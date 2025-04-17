import { Component } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [IconComponent, RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

}
