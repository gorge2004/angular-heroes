import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  public heroForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });
  public publishers = [
    { id: 'DC Comics', desc: 'DC- comics' },
    { id: 'Marvel Comics', desc: 'Marvel- comics' },
  ];

  constructor(
    private heroService: HeroesService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    console.log('oninit');

    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activeRoute.params.pipe(
      switchMap( ({id}) => this.heroService.getHeroByid(id)),
    ).subscribe (hero => {
      if (!hero){
        return this.router.navigateByUrl('/');
      }

     return  this.heroForm.reset(hero);
    });
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }
  onSubmit(): void {
    if (this.heroForm.invalid) {
      return;
    }

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero).subscribe((hero) => {
        // TODO mostrar snackbar
        this.showSnackbar(`Hero ${hero.superhero} updated`);
      });
      return;
    } else {
      this.heroService.addHero(this.currentHero).subscribe((hero) => {
        // TODO mostrar snackbar y redidriger

        console.log(hero);
        this.showSnackbar(`Hero ${hero.superhero} created`);
          this.router.navigate(['/heroes/edit', hero.id]);

      });
    }
  }
  onDeleteHero():void{
    if(!this.currentHero.id) return;


    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: this.currentHero,
    });

    dialogRef.afterClosed()
    .pipe(
      filter((result: boolean) => result),
      switchMap( () => this.heroService.deleteHero(this.currentHero.id)),
       )
       .subscribe( (wasDeleted)=>{
        this.showSnackbar(`Hero ${this.currentHero.superhero} deleted`);

        setTimeout(()=> {
          this.router.navigate(['/heroes' ]);

        }, 1500);
       })

 /*    .subscribe(result => {
      console.log('The dialog was closed', result);
      if (!result) return;

      this.heroService.deleteHero(this.currentHero.id).subscribe(wasDeleted => {
        if (wasDeleted) {
          this.showSnackbar(`Hero ${this.currentHero.superhero} deleted`);
          setTimeout(()=> {
            this.router.navigate(['/heroes' ]);

          }, 1500);

        }else {
          this.showSnackbar(`ERROR Hero ${this.currentHero.superhero} was not  deleted`);

        }

      });
    });*/
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'listo', {
      duration: 3000
    })
   }
}
