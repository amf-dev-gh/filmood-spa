import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie.interface';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'card-movie',
  imports: [RouterLink, CommonModule],
  templateUrl: './card-movie.component.html'
})
export class CardMovieComponent {

  @Input()movie?:Movie;

  getFullImageUrl(size:string, path: string): string {
    if(path === null){
      return '/images/default_poster.webp';
    };
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

}
