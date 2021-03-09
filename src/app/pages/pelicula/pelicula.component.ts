import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-details';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public movieDetail: MovieDetails;
  public cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router) {}

  /**
   *
   */
  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    // para consumir dos subscribe en paralelo y no terminar proceso hasta que ambos respondan
    combineLatest([
      this.peliculasService.getPelicalaDetalle(id),
      this.peliculasService.getCast(id)
    ]).subscribe( ([movie, cast]) => {
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.movieDetail = movie;
      this.cast = cast.filter(actor => actor.profile_path);
    });
  }

  onRegresar(): void {
    this.location.back();
  }
}
