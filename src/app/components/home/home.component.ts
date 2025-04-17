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

  ngOnInit(): void {
    this.getActualMovies(1);
    this.getCommingMovies(1)
  }

  getActualMovies(page: number) {
    this.movieService.getNowPlayingMovies(page).subscribe({
      next: response => {
        // VALOR QUEMADO, hasta decidir..
        this.actualMovies = response.results.slice(0,8);
      },
      error: err => console.error("Error loading recent movies", err)
    })
  }

  getCommingMovies(page: number) {
    this.movieService.getUpCommingMovies(page).subscribe({
      next: response => {
        // VALOR QUEMADO, hasta decidir..
        this.commingMovies = response.results.slice(0,8);
      },
      error: err => console.error("Error loading recent movies", err)
    })
  }


}