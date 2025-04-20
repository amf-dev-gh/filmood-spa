import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie.interface';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, FormsModule,],
  templateUrl: './movies.component.html'
})
export class MoviesComponent {

  private readonly movieService = inject(MovieService);

  inputTitle: string = '';

  foundMovies: Movie[] = [];

  searchMovie() {
    if (this.inputTitle === '') {
      // no puede ser vacio
      return;
    }
    if (this.inputTitle.length < 4) {
      // igrese al menos 3 letras
      return
    }

    console.log('Buscar por ', this.inputTitle);
    this.movieService.findMovieByTitle(this.inputTitle).subscribe({
      next: response => {
        console.log(response);
        this.foundMovies = response.results;
      },
      error: err => console.error("Error searching movies", err)
    })
    this.inputTitle = '';
  }

}
