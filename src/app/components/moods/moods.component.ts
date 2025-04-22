import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { UserMood } from '../../types/mood.interface';
import { CommonModule } from '@angular/common';
import { CardMovieComponent } from "../card-movie/card-movie.component";

@Component({
  selector: 'app-moods',
  imports: [CommonModule, CardMovieComponent],
  templateUrl: './moods.component.html',
  styleUrl: './moods.component.css'
})
export class MoodsComponent implements OnInit {

  private readonly apiService = inject(ApiService);
  private readonly authService = inject(AuthService);

  readonly username = this.authService.getUsername();

  userMoods:UserMood[] = [];

  selectedMood?:UserMood;

  ngOnInit(): void {
    this.getUserMoods();
  }

  getUserMoods(){
    this.apiService.getUserMoods(this.username).subscribe({
      next: response => {
        this.userMoods = response;
      },
      error: err => {
        console.error("Error getting user Moods", err);
      }
    })
  }

  selectMood(mood:UserMood){
    this.selectedMood = mood;
  }

  closeMood(){
    this.selectedMood = undefined;
  }

  createMood(){
    
  }

}
