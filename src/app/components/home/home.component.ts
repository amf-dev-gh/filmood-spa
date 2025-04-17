import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Genre, Movie } from '../../types/movie.interface';
import { CommonModule } from '@angular/common';
import { GENRES } from '../../consts/genres';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  private readonly movieService = inject(MovieService);
  genres: Genre[] = GENRES;
  movies: Movie[] = [];
  actualPage: number = 0;
  totalPages: number = 0;

  ngOnInit(): void {
    this.getRecentMovies(1);
  }

  getRecentMovies(page: number) {
    this.movieService.getNowPlayingMovies(page).subscribe({
      next: response => {
        console.log(response)
        this.totalPages = response.total_pages;
        this.actualPage = response.page;
        this.movies = response.results;
      },
      error: err => console.error("Error loading recent movies", err)
    })
  }

  goToNextPage(){
    this.getRecentMovies(this.actualPage+1);
  }

}