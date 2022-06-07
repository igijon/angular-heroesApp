import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
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
              private router: Router) { }

  ngOnInit(): void {

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
        .subscribe( resp => console.log('Actualizando...', resp));
    }
    else {
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
        });
    }
  }

}
