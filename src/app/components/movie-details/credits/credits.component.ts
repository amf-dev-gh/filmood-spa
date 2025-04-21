import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { Movie, Person, ProductionCompany } from '../../../types/movie.interface';
import { CreditsResponse } from '../../../types/apiResponse.interface';

@Component({
  selector: 'app-credits',
  imports: [CommonModule],
  templateUrl: './credits.component.html'
})
export class CreditsComponent implements OnInit {

  @Input()movie?:Movie;
  @Input()credits?:CreditsResponse;

  direction: Person[] = [];
  screenplay: Person[] = []; // Guionista
  cast: Person[] = [];
  music: Person[] = [];
  photograph: Person[] = [];
  companies: ProductionCompany[] = [];

  ngOnInit(): void {
    this.getInfoCredits();
  }

  getInfoCredits() {
    if (this.movie && this.credits) {
    this.direction = this.credits.crew.filter(c => c.job.toLowerCase() === "director");
    this.screenplay = this.credits.crew.filter(c => c.job.toLowerCase() === "screenplay");
    this.cast = this.credits.cast.filter(c => c.known_for_department.toLowerCase() === "acting");
    this.music = this.credits.crew.filter(c => c.job.toLowerCase() === "original music composer");
    this.photograph = this.credits.crew.filter(c => c.job.toLowerCase() === "director of hotography");
      this.companies = this.movie.production_companies;
    }
  }

  getFullImageUrl(path: string): string {
    if(path === null){
      return '/images/default_actor.webp';
    };
    return `https://image.tmdb.org/t/p/h632${path}`;
  }
}
