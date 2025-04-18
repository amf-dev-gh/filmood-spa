import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Image, Movie, Person, ProductionCompany, Video } from '../../types/movie.interface';
import { CommonModule } from '@angular/common';
import { IconComponent } from "../icon/icon.component";
import { NgxLiteYoutubeModule } from 'ngx-lite-video';
import { CreditsResponse } from '../../types/apiResponse.interface';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RouterLink, IconComponent, NgxLiteYoutubeModule],
  templateUrl: './movie-details.component.html'
})
export class MovieDetailsComponent implements OnInit {

  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);

  movie?: Movie;
  error: boolean = false;
  imageList: Image[] = [];
  videoList: Video[] = [];

  direction:Person[] = [];
  screenplay:Person[] = []; // Guionista
  cast:Person[] = [];
  music:Person[] = [];
  photograph:Person[] = [];
  companies:ProductionCompany[] = [];

  showIndex: number = 0;
  effectSlider:string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.getMovie(id);
      }
    })
    setInterval(() => {
      this.nextImage();
    }, 4000);
  }

  getMovie(id: string) {
    this.movieService.getDetailsMovie(id).subscribe({
      next: response => {
        this.movie = response;
        this.getImageList(id);
        this.getVideoList(id);
        this.getCredits(id);
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

  nextImage() {
    if (this.showIndex < this.imageList.length - 1) {
      this.showIndex += 1;
    } else {
      this.showIndex = 0;
    }
    this.effectSlider = 'animate-slide-in-right';
  }

  previousImage() {
    if (this.showIndex === 0) {
      this.showIndex = this.imageList.length -1;
    } else {
      this.showIndex -= 1;
    }
    this.effectSlider = 'animate-slide-in-left';
  }

  getFullImageUrl(path:string):string{
    return `https://image.tmdb.org/t/p/original${path}`;
  }

  getCredits(id:string){
    this.movieService.getCredits(id).subscribe({
      next: data => {
        this.getInfoCredits(data);
      },
      error: err => console.error("Error getting credits",err)
    })
  }

  getInfoCredits(data: CreditsResponse){
    this.direction = data.crew.filter(c => c.job.toLowerCase() === "director");
    this.screenplay = data.crew.filter(c => c.job.toLowerCase() === "screenplay");
    this.cast = data.cast.filter(c => c.known_for_department.toLowerCase() === "acting");
    this.music = data.crew.filter(c => c.job.toLowerCase() === "original music composer");
    this.photograph = data.crew.filter(c => c.job.toLowerCase() === "director of hotography");
    if(this.movie){
      this.companies = this.movie.production_companies;
    }
  }

}