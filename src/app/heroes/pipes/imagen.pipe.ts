import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  imgBase:string = 'assets/heroes/';
  transform(value: Heroe): string {
    if(!value.id && !value.alt_img) {
      return  `assets/no-image.png`;
    }
    else if (value.alt_img) {
      return value.alt_img;
    }
    else {
      return `${this.imgBase}${value.id}.jpg`;
    }
  }

}
