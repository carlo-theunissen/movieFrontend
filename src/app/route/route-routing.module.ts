import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "../app.component";
import {CreateMovieComponent} from "../create-movie/create-movie.component";

const routes: Routes = [{
  component: AppComponent,
  path: ''
},
  {
    component: CreateMovieComponent,
    path: 'create'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
