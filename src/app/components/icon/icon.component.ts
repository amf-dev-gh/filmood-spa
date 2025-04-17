import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-svg',
  imports: [CommonModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input() name!: string;
  @Input() class: string = '';
}