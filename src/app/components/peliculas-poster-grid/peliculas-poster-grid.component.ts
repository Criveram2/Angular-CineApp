import {   Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies: Movie[];

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onMovieClick(movie: Movie): void{
    this.router.navigate(['/pelicula', movie.id]);
  }
}
