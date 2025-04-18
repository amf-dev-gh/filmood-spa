import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie.interface';
import { CommonModule } from '@angular/common';
import { CardMovieComponent } from "../card-movie/card-movie.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardMovieComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private readonly movieService = inject(MovieService);
  actualMovies: Movie[] = [];
  commingMovies: Movie[] = [];
  trendingMovies: Movie[] = [];

  ngOnInit(): void {
    this.getActualMovies(1);
    this.getCommingMovies(2);
    this.getTrendingMovies(3);
  }

  getActualMovies(page: number) {
    this.movieService.getNowPlayingMovies(page).subscribe({
      next: response => {
        // VALOR QUEMADO, hasta decidir..
        this.actualMovies = response.results.slice(0,8);
      },
      error: err => console.error("Error loading actual movies", err)
    })
  }

  getCommingMovies(page: number) {
    this.movieService.getUpCommingMovies(page).subscribe({
      next: response => {
        // VALOR QUEMADO, hasta decidir..
        this.commingMovies = response.results.slice(0,8);
      },
      error: err => console.error("Error loading comming movies", err)
    })
  }

  getTrendingMovies(page: number) {
    this.movieService.getTrendingMovies(page).subscribe({
      next: response => {
        // VALOR QUEMADO, hasta decidir..
        this.trendingMovies = response.results.slice(0,8);
      },
      error: err => console.error("Error loading trending movies", err)
    })
  }
}