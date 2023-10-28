import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interfaces';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent {
  searchInput: FormControl = new FormControl('');
  heroes: Hero[] = [];
  selectedHero?: Hero ;

  constructor(private heroService: HeroesService) {}


  searchHero(): void {
    const value: string = this.searchInput.value || '';
    this.heroService.getSuggestion(value)
    .subscribe( heroes =>{
      this.heroes = heroes;
      console.log(heroes);

    })

  }
  onSelectedOption(event:MatAutocompleteSelectedEvent):void{
    console.log(event);
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero:Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;

  }
}
