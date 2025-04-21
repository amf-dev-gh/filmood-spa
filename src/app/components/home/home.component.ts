import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie.interface';
import { CommonModule } from '@angular/common';
import { CardMovieComponent } from "../card-movie/card-movie.component";
import { IconComponent } from "../icon/icon.component";
import { Mood } from '../../types/mood.interface';
import { MOODS } from '../../consts/moods';
import { GENRES } from '../../consts/genres';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardMovieComponent, IconComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private readonly movieService = inject(MovieService);
  actualMovies: Movie[] = [];
  commingMovies: Movie[] = [];
  moodMovies: Movie[] = [];

  moods: Mood[] = MOODS;

  initMood: Mood = {
    src: '',
    value: '...',
    genre: {
      id: 0,
      name: ''
    }
  }

  ngOnInit(): void {
    this.getActualMovies(1);
    this.getCommingMovies(2);
    this.getTrendingMovies(3);
  }

  getActualMovies(page: number) {
    this.movieService.getNowPlayingMovies(page).subscribe({
      next: response => {
        this.actualMovies = response.results.slice(8, 16);
      },
      error: err => console.error("Error loading actual movies", err)
    })
  }

  getCommingMovies(page: number) {
    this.movieService.getUpCommingMovies(page).subscribe({
      next: response => {
        this.commingMovies = response.results.slice(8, 16);
      },
      error: err => console.error("Error loading comming movies", err)
    })
  }

  getTrendingMovies(page: number) {
    this.movieService.getTrendingMovies(page).subscribe({
      next: response => {
        this.moodMovies = response.results.slice(8, 16);
      },
      error: err => console.error("Error loading trending movies", err)
    })
  }

  setMood(mood: Mood) {
    const genre = GENRES.find(g => g === mood.genre);
    if (!genre) {
      this.getTrendingMovies(1);
    }
    else {
      this.movieService.getMoviesByGenre(genre.id, 1).subscribe({
        next: response => {
          this.moodMovies = response.results.slice(0, 8);
        },
        error: err => console.error("Error loading trending movies", err)
      })
    }
    this.initMood = mood;
  }
}