import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  imgBase:string = 'assets/heroes/';
  transform(value: Heroe): string {
    return `${this.imgBase}${value.id}.jpg`;
  }

}
