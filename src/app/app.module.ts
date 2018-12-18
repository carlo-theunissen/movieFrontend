import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VideoContainerComponent } from './video-container/video-container.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { RouteComponent } from './route/route.component';
import { RouteRoutingModule} from "./route/route-routing.module";
import { CreateMovieComponent } from './create-movie/create-movie.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    VideoContainerComponent,
    RouteComponent,
    CreateMovieComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RouteRoutingModule,
  ],
  providers: [],
  bootstrap: [RouteComponent]
})
export class AppModule { }
