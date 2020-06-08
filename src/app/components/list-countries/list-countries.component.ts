import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { forkJoin } from 'rxjs';
import { Region } from '../../models/region';
import { Country } from 'src/app/models/country';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html'
})
export class ListCountriesComponent implements OnInit {

  public load = false;
  public listCountries: Country[] = [];
  public listRegions: Region[] = [];
  public listCountriesToVisit: Country[] = [];
  public regionSelected = 'EU';
  public loading = false;

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {

    // tslint:disable-next-line: deprecation
    forkJoin (
      this.countryService.getCountriesByRegions('eu'),
      this.countryService.getAllRegions()
    ).subscribe(results => {
      this.listCountries = results[0];
      this.listRegions = results[1];
      this.load = true;
    }, error => {
      console.error(error);
      this.load = true;
    });

  }

  filterCountries($event) {
    this.countryService.getCountriesByRegions($event.value)
        .subscribe(list => {
          this.loading = true;
          this.listCountries = _.differenceBy(list, this.listCountriesToVisit, c => c.name);
          this.loading = false;
        });
  }

  drop(event: CdkDragDrop<Country[]>) {
    // Si se mueve dentro de la misma bloque, lo muevo dentro del contenedor
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Sino lo paso al otro contenedor
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
