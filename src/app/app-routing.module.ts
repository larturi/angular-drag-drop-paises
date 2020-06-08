import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCountriesComponent } from './components/list-countries/list-countries.component';


const routes: Routes = [
  {path: 'list-countries', component: ListCountriesComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'list-countries'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
