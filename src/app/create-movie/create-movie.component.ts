import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  public state : string = "input";
  public name : string;
  public description : string;
  public duration : number;
  public actors : string;
  public genres : string;
  public bgImage : string;
  constructor(private http : HttpClient) { }

  ngOnInit() {
  }

  public handleSubmit() : void{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let data = {
      "Name": this.name,
      "Description" : this.description,
      "Duration" : this.duration,
      "Actors" : this.actors.split(','),
      "Genres" : this.genres.split(','),
      "BgImage" : this.bgImage
    };

    console.log(JSON.stringify(data));
    this.state = "loading";
    this.http.post("/api/submit", JSON.stringify(data), httpOptions).subscribe(
      (val) => {
        this.state = "success";
        setTimeout(() => this.state = "input", 2000);
      },
      response => {
        //POST call in error
      },
      () => {
        //The POST observable is now completed
      });
  }

}
