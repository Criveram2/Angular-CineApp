import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError} from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieDetails } from '../interfaces/movie-details';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private baseUrl ='https://api.themoviedb.org/3';
  constructor(private http: HttpClient) { }
  private carteletaPage = 1;
  public cargando = false;

  // tslint:disable-next-line: typedef
  get params() {
    return {
      api_key: 'dae99c79fc6ce4ede3475d01cfffda20',
      language: 'es-ES',
      page: this.carteletaPage.toString()};
  }

  resetCarteleraPage(): void{
     this.carteletaPage = 1;
   }


  /*
   * Consultar lista de peliculas en cartelera
   * @return retorna lista de Movies
   */
  getCarteleta(): Observable<Movie[]>{
   if (this.cargando){
     return of([]);
   }

   this.cargando = true;
   return  this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,
   {params: this.params})
   .pipe(
     map( (resp) => resp.results),
     tap( () => {
        this.carteletaPage += 1;
        this.cargando = false;
     })
   );
  }

   /**
    * buscar peliculas por texto
    * @param texto cadena de caracteres por la cual se realiza la busqueda
    */
  buscarPeliculas(texto: string): Observable<Movie[]>{

    const params = {...this.params, page: '1', query: texto };
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {params})
    .pipe(
      map( (resp) => resp.results),
      tap( () => {
         this.cargando = false;
         this.carteletaPage += 1;
      })
    );
  }

  /**
   * Condulta el detalle de una pelicula por su id
   * @param id identificador de la pelicula
   */
  getPelicalaDetalle(id: string): Observable<MovieDetails>{
   return  this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`,
    {params: this.params}).pipe(
      catchError(error => of(null) ));
  }


  /**
   * Condulta el casting de una pelicula por su id
   * @param id identificador de la pelicula
   */
  getCast(id: string): Observable<Cast[]>{
    return  this.http.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`,
     {params: this.params}).pipe(
      catchError(error => of(null) ),
      map(resp => resp.cast)
     );
   }

}
