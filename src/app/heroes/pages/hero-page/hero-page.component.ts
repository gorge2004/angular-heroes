import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [],
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;
  public constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe( switchMap(({ id }) => this.heroesService.getHeroByid(id)))
      .subscribe((hero) => {
         if (!hero) {
        return this.router.navigate(['/heroes/list']);
        }
        this.hero = hero;

        return;
      });

    }
     goBack(): void{

      this.router.navigateByUrl('/heroes/list');
    }
}