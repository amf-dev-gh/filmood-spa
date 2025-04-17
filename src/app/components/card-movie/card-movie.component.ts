import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'card-movie',
  imports: [RouterLink],
  templateUrl: './card-movie.component.html'
})
export class CardMovieComponent {

  @Input()movie?:Movie;

}
