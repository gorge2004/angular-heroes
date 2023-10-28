import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interfaces';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    let imgUrl: string = 'assets/';
    if (!hero.id && !hero.alt_img) {
      imgUrl += 'no-image.png';
    }
    else {

     imgUrl += `heroes/${hero.id}.jpg`;
    }
    if ( hero.alt_img ) return hero.alt_img;
    return imgUrl;
  }

}
