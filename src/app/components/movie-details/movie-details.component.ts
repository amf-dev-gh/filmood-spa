import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Image, Movie, MovieDTO, Video } from '../../types/movie.interface';
import { CommonModule } from '@angular/common';
import { IconComponent } from "../icon/icon.component";
import { NgxLiteYoutubeModule } from 'ngx-lite-video';
import { CreditsResponse } from '../../types/tmdbResponse.interface';
import { CreditsComponent } from "./credits/credits.component";
import { Provider } from '../../types/prpovider.interface';
import { Mood, UserMood } from '../../types/mood.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RouterLink, IconComponent, NgxLiteYoutubeModule, CreditsComponent],
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit {

  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);
  private readonly apiService = inject(ApiService);

  movie?: Movie;
  error: boolean = false;
  imageList: Image[] = [];
  videoList: Video[] = [];

  credits?: CreditsResponse;

  showIndex: number = 0;
  imageLoaded:boolean = false;

  movieProdivers: Provider[] = [];
  linkProviderTMDB: string = '';

  userMoods: UserMood[] = [];
  showModal:boolean = false;
  addSuccess:string = '';
  addError:string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.getMovie(id);
      }
    })
    this.getUserMoods();
    setInterval(() => {
      this.slideImage(1);
    }, 4000);
  }

  getMovie(id: string) {
    this.movieService.getDetailsMovie(id).subscribe({
      next: response => {
        this.movie = response;
        this.getImageList(id);
        this.getVideoList(id);
        this.getCredits(id);
        this.getMovieProviders(id);
      },
      error: err => {
        console.error('Error getting movie details', err);
        this.error = true;
      }
    })
  }

  getVideoList(id: string) {
    this.movieService.getVideoList(id).subscribe({
      next: data => {
        this.videoList = data.results;
        this.videoList = this.videoList.filter(
          video => video.type.toLowerCase() === 'trailer'
            && video.site.toLowerCase() === 'youtube');
      },
      error: err => console.error("Error getting videos", err)
    });
  }

  getImageList(id: string) {
    this.movieService.getImgageList(id).subscribe({
      next: data => {
        this.imageList = data.backdrops;
      },
      error: err => console.error("Error getting videos", err)
    });
  }

  slideImage(slide:number){
    const position = this.showIndex + slide;
    if(position < 0){
      this.showIndex = this.imageList.length - 1;
    } else if(position === this.imageList.length){
      this.showIndex = 0;
    }else{
      this.showIndex = position;
    }
  }

  getFullImageUrl(size: string, path: string): string {
    if (path === null) {
      return '/images/default-backdrop.webp';
    };
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  getCredits(id: string) {
    this.movieService.getCredits(id).subscribe({
      next: data => {
        this.credits = data;
      },
      error: err => console.error("Error getting credits", err)
    })
  }

  getMovieProviders(id: string) {
    this.movieService.getMovieProviders(id).subscribe({
      next: response => {
        if (response) {
          this.linkProviderTMDB = response.results.ES.link;
          this.movieProdivers = response.results.ES.flatrate;
        }
      },
      error: err => console.error("Error getting providers", err)
    })
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  getUserMoods() {
    this.apiService.getUserMoods().subscribe({
      next: response => {
        this.userMoods = response;
      },
      error: err => {
        console.error("Error getting user Moods", err);
      }
    })
  }

  openCloseModal(){
    this.showModal = !this.showModal;
  }

  addMovieToMod(mood:UserMood, movie:Movie){
    const movieDTO:MovieDTO = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path
    }
    this.apiService.addMovieToMood(mood.id, movieDTO).subscribe({
      next: () => {
        this.addSuccess = `¡Pelicula guardada con éxito a ${mood.name}!`.toUpperCase();
        setTimeout(() => {
          this.showModal = false;
        }, 1700);
      },
      error: err => {
        console.error("error adding to mood", err);
        this.addError = "No se pudo agregar la pelicula a la lista. Intente mas tarde".toUpperCase();
      }
    })
  }
}