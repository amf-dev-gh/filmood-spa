import { Component, inject, OnInit } from '@angular/core';
import { UserMood } from '../../types/mood.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MovieDTO } from '../../types/movie.interface';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-moods',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './moods.component.html',
  styleUrl: './moods.component.css'
})
export class MoodsComponent implements OnInit {

  private readonly storageService = inject(StorageService);

  userMoods: UserMood[] = [];

  selectedMood?: UserMood;

  showForm: boolean = false;

  inputName: string = '';

  ngOnInit(): void {
    this.getUserMoods();
  }

  getUserMoods() {
    this.userMoods = this.storageService.getUserMoods();
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
    this.storageService.createNewMood(this.inputName);
    window.location.reload();
  }

  deleteMood(id: number) {
    const confirmDelete = confirm('¿Está seguro de eliminiar el mod actual?');
    if (confirmDelete) {
      this.storageService.deleteMood(id);
      window.location.reload();
    }
  }

  deleteMovie(movie: MovieDTO, moodId: number) {
    const deleteConfirm = confirm(`Se eliminará la pelicula ${movie.title} de su Mood ${this.selectedMood?.name}. ¿Confirma?`);
    if (deleteConfirm) {
      const mood = this.storageService.deleteMovieFromMood(movie.id, moodId);
      this.getUserMoods();
      this.selectedMood = mood;
    }
  }

  getFullImageUrl(size: string, path: string): string {
    if (path === null) {
      return '/images/default_poster.webp';
    };
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

}
