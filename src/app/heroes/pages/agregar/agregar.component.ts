import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  `
  img {
    width: 100%;
    border-radius: 5px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar'))
    {
      return;
    }
    this.activatedRoute.params
      .pipe(
        //Si tengo id estoy editando
        switchMap(({id}) => this.heroesService.getHeroePorId(id))
      )
      .subscribe( resp => this.heroe = resp);


  }

  guardar() {

    //Mínima validación
    if( this.heroe.superhero.trim().length === 0) return;

    //Si estamso editando tenemos id y si estamos creando aún no tenemos id
    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe)
        .subscribe( resp => this.mostrarSnackbar('Registro actualizado'));
    }
    else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackbar('Registro creado');
        });
    }
  }

  borrar() {
    this.heroesService.borrarHeroe(this.heroe.id!)
      .subscribe ( resp => {
        this.router.navigate(['/heroes'])
      });
  }

  mostrarSnackbar( mensaje: string ) {
    this.snackBar.open(mensaje, 'Ok!', {
      duration: 2500
    });
  }
}
