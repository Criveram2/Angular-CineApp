import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  buscarPelicula(textoBusqueda: string): void{

    const texto  = textoBusqueda.trim();

    if (texto.length === 0){
      return;
    }
    this.router.navigate(['/buscar', texto]);
  }
}
