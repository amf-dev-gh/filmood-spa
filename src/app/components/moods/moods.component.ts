import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UserMood } from '../../types/mood.interface';
import { CommonModule } from '@angular/common';
import { CardMovieComponent } from "../card-movie/card-movie.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-moods',
  imports: [CommonModule, CardMovieComponent, FormsModule],
  templateUrl: './moods.component.html',
  styleUrl: './moods.component.css'
})
export class MoodsComponent implements OnInit {

  private readonly apiService = inject(ApiService);

  userMoods: UserMood[] = [];

  selectedMood?: UserMood;

  showForm: boolean = false;

  inputName: string = '';

  ngOnInit(): void {
    this.getUserMoods();
  }

  getUserMoods() {
    this.apiService.getUserMoods().subscribe({
      next: response => {
        this.userMoods = response;
      },
      error: err => {
        console.error("Error getting user Moods", err);
      }
    })
  }

  selectMood(mood: UserMood) {
    this.selectedMood = mood;
  }

  closeMood() {
    this.selectedMood = undefined;
  }

  newMood() {
    this.showForm = true;
  }

  closeNewMood() {
    this.showForm = false;
  }

  createMood() {
    if (this.inputName === '') {
      return;
    }
    this.apiService.createNewMood(this.inputName).subscribe({
      next: () => {
        window.location.reload();
      },
      error: err => {
        console.error("Error creating mood", err);
      }
    })
  }

  deleteMood(id: number) {
    const confirmDelete = confirm('¿Está seguro de eliminiar el mod actual?');
    if (confirmDelete) {
      this.apiService.deleteMood(id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: err => {
          console.error("Error creating mood", err);
        }
      })
    }
  }

  changePrivacity(moodId:number){
    const updateConfirm = confirm(`Se cambiará la privacidad de su Mood ${this.selectedMood?.name}. ¿Confirma?`);
    if(updateConfirm){
      this.apiService.updateMood(moodId).subscribe({
        next: response => {
          alert('Mood actualizazdo');
          this.getUserMoods();
          this.selectedMood = response;
        },
        error: err => {
          console.error('Update Error', err);
        }
      })
    }
  }

}
