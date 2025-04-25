import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserMood } from '../../types/mood.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-comunity-moods',
  imports: [CommonModule, RouterLink],
  templateUrl: './comunity-moods.component.html',
  styleUrl: './comunity-moods.component.css'
})
export class ComunityMoodsComponent implements OnInit {

  private readonly apiService = inject(ApiService);

  comunityMoods: UserMood[] = [];

  showindex:number = -1;

  ngOnInit(): void {
    this.getAllPublicMoods();
  }

  getAllPublicMoods() {
    this.apiService.getPulicMoods().subscribe({
      next: response => {
        this.comunityMoods = response;
        this.comunityMoods = this.comunityMoods.filter(mood => mood.movies.length > 0);
      },
      error: err => console.error("Error loading comunity Moods", err)
    })
  }

  toggle(index: number) {
    if (index === this.showindex){
      this.showindex = -1;
      return;
    }
    this.showindex = index;
  }
}
