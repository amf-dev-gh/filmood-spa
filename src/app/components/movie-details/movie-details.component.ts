import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../types/movie.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit{

  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);

  movie?:Movie;
  error:boolean = false;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if(id){
        this.getMovie(id);
      }
    })
  }

  getMovie(id:string){
    this.movieService.getDetailsMovie(id).subscribe({
      next: response => {
        console.log(response);
        this.movie = response;
      },
      error: err => {
        console.error('Error getting movie details', err);
        this.error = true;
      }
    })
  }

}
