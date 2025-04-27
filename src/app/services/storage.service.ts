import { Injectable } from '@angular/core';
import { UserMood } from '../types/mood.interface';
import { MovieDTO } from '../types/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getUserMoods(): UserMood[] {
    const userMoods = localStorage.getItem('USER_MOODS');
    if (userMoods) {
      return JSON.parse(userMoods);
    }
    return [];
  }

  setUserMoods(userMoods: UserMood[]): any {
    localStorage.setItem('USER_MOODS', JSON.stringify(userMoods));
  }

  createNewMood(newName: string): any {
    const userMoods = this.getUserMoods();
    let newId = 1;
    if (userMoods.length) {
      const lastId = userMoods[userMoods.length - 1].id;
      newId = lastId + 1;
    }
    const newMood: UserMood = {
      id: newId,
      movies: [],
      name: newName,
      private: false
    }
    const updateUserMoods = [...userMoods, newMood];
    this.setUserMoods(updateUserMoods);
  }

  deleteMood(id: number): any {
    const userMoods = this.getUserMoods();
    const updateUserMoods = userMoods.filter(m => m.id !== id);
    this.setUserMoods(updateUserMoods);
  }

  addMovieToMood(moodId: number, movie: MovieDTO): void {
    const userMoods = this.getUserMoods();
    const moodIndex = userMoods.findIndex(m => m.id === moodId);
    if (moodIndex === -1) {
      return;
    }
    const actualMovies = userMoods[moodIndex].movies;
    const existMovie = actualMovies.find(m => m.id === movie.id);
    if(existMovie){
      return;
    }
    const updatedMovies = [...actualMovies, movie];

    const updatedMood: UserMood = {
      ...userMoods[moodIndex],
      movies: updatedMovies
    };

    userMoods[moodIndex] = updatedMood;
    this.setUserMoods(userMoods);
  }

  deleteMovieFromMood(movieId: number, moodId: number): UserMood | undefined {
    const userMoods = this.getUserMoods();
    const moodIndex = userMoods.findIndex(m => m.id === moodId);
    if (moodIndex === -1) {
      return undefined;
    }

    const mood = userMoods[moodIndex];
    const updatedMovies = mood.movies.filter(movie => movie.id !== movieId);
    const updatedMood: UserMood = {
      ...mood,
      movies: updatedMovies
    };

    userMoods[moodIndex] = updatedMood;
    this.setUserMoods(userMoods);

    return updatedMood;
  }

}
