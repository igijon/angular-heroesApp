import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //pure: false //Se disparará cada vez que el ciclo de detección de cambios se dispare. Con pure
  //por defecto a true se disparará cuando cambie el objeto (no la propiedad)
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
