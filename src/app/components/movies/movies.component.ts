import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Genre, Movie } from '../../types/movie.interface';
import { CardMovieComponent } from "../card-movie/card-movie.component";
import { GENRES } from '../../consts/genres';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, FormsModule, CardMovieComponent],
  templateUrl: './movies.component.html'
})
export class MoviesComponent implements OnInit {

  private readonly movieService = inject(MovieService);
  private readonly lastSearch = this.movieService.$lastFound();

  genres: Genre[] = GENRES;
  selectedGenre: string = '';

  inputTitle: string = '';
  title: string = '';

  totalPages: number = 0;
  actualPage: number = 1;

  foundMovies: Movie[] = [];
  notFoundMovies: boolean = false;

  ngOnInit(): void {
    this.getLastSearch();
  }

  searchMovie() {
    if (this.inputTitle === '' || this.inputTitle.length < 4) {
      return;
    }
    this.selectedGenre = '';
    this.notFoundMovies = false;
    this.title = this.inputTitle;
    this.movieService.findMovieByTitle(this.inputTitle, 1).subscribe({
      next: response => {
        this.totalPages = response.total_pages;
        this.actualPage = response.page;
        this.foundMovies = response.results;
        if (!this.foundMovies.length) {
          this.notFoundMovies = true;
        }
        this.setLastSearch();
      },
      error: err => console.error("Error searching movies", err)
    })
  }

  goToPage(movement: string) {
    if (movement === 'next') {
      this.actualPage += 1;
    } else {
      this.actualPage -= 1;
    }
    if (this.selectedGenre) {
      this.movieService.getMoviesByGenre(parseInt(this.selectedGenre), this.actualPage).subscribe({
        next: response => {
          this.foundMovies = response.results;
          this.setLastSearch();

        },
        error: err => console.error("Error searching movies", err)
      })
    } else {
      this.movieService.findMovieByTitle(this.inputTitle, this.actualPage).subscribe({
        next: response => {
          this.foundMovies = response.results;
          this.setLastSearch();
        },
        error: err => console.error("Error searching movies", err)
      })
    }
  }

  findByGenre(genreId: number) {
    const genre = this.genres.find(g => g.id === parseInt(this.selectedGenre));
    this.title = '';
    this.movieService.getMoviesByGenre(genreId, 1).subscribe({
      next: response => {
        this.totalPages = response.total_pages;
        this.actualPage = response.page;
        this.foundMovies = response.results;
        if (genre) {
          this.title = genre.name;
        }
        if (!this.foundMovies.length) {
          this.notFoundMovies = true;
        }
        this.setLastSearch();
      },
      error: err => console.error("Error searching movies", err)
    })
  }

  getLastSearch() {
    this.selectedGenre = this.lastSearch.selectedGenre;
    this.inputTitle = this.lastSearch.inputTitle;
    this.title = this.lastSearch.title;
    this.totalPages = this.lastSearch.totalPages;
    this.actualPage = this.lastSearch.actualPage;
    this.foundMovies = this.lastSearch.foundMovies;
    this.notFoundMovies = this.lastSearch.notFoundMovies;
  }

  setLastSearch() {
    this.movieService.$lastFound.set({
      selectedGenre: this.selectedGenre,
      inputTitle: this.inputTitle,
      title: this.title,
      totalPages: this.totalPages,
      actualPage: this.actualPage,
      foundMovies: this.foundMovies,
      notFoundMovies: this.notFoundMovies
    })
  }

  clearSearch() {
    this.selectedGenre = '';
    this.inputTitle = '';
    this.title = '';
    this.totalPages = 0;
    this.actualPage = 1;
    this.foundMovies = [];
    this.notFoundMovies = false;
    this.setLastSearch();
  }
}