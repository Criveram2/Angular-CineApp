import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public movies: Movie[] = [];
  public texto: '';

  constructor(private activaredRoute: ActivatedRoute, private peliclasService: PeliculasService) { }

  ngOnInit(): void {

    this.activaredRoute.params.subscribe(params => {
      this.peliclasService.buscarPeliculas(params.texto).subscribe(
        movies => {
          this.texto = params.texto;
          this.movies = movies ;
        }
      );
    });
  }

}
