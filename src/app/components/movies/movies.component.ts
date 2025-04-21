import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie.interface';
import { CardMovieComponent } from "../card-movie/card-movie.component";

@Component({
  selector: 'app-movies',
  imports: [CommonModule, FormsModule, CardMovieComponent],
  templateUrl: './movies.component.html'
})
export class MoviesComponent {

  private readonly movieService = inject(MovieService);

  inputTitle: string = '';
  title: string = '';

  totalPages: number = 0;
  actualPage: number = 1;

  foundMovies: Movie[] = [];
  notFoundMovies: boolean = false;

  searchMovie() {
    if (this.inputTitle === '' || this.inputTitle.length < 4) {
      return;
    }
    this.notFoundMovies = false;
    this.title = this.inputTitle;
    this.movieService.findMovieByTitle(this.inputTitle, this.actualPage).subscribe({
      next: response => {
        console.log(response);
        this.totalPages = response.total_pages;
        this.actualPage = response.page;
        this.foundMovies = response.results;
        this.inputTitle = '';
        if (!this.foundMovies.length) {
          this.notFoundMovies = true;
        }

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
    this.movieService.findMovieByTitle(this.title, this.actualPage).subscribe({
      next: response => {
        console.log(response);
        this.foundMovies = response.results;
      },
      error: err => console.error("Error searching movies", err)
    })
  }

}
