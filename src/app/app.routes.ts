import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoodsComponent } from './components/moods/moods.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/singup/singup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SingupComponent },
  { path: 'about', component: AboutComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'moods', component: MoodsComponent },
  { path: '**', component: HomeComponent }
];
