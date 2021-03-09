import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

   public movies: Movie[] = [];
   public moviesSlideshow: Movie[] = [];

   @HostListener('window:scroll', ['$event'])
   onScroll(): void{
    const pos = (document.documentElement.scrollTop || document.body.scrollTop)  + 1100;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if (pos > max){

      if ( !this.peliculasService.cargando){
      this.peliculasService.getCarteleta().subscribe(
        movies => {
          this.movies.push (...movies) ;
        });
      }else{ return; }
    }
  }
  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.peliculasService.getCarteleta()
    .subscribe( movies => {
        this.moviesSlideshow = movies;
        this.movies = movies;
      });
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }
}

