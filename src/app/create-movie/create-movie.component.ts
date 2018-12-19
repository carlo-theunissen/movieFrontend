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
  public actorList : any;
  public genresList : any;
  public bgImage : string;
  constructor(private http : HttpClient) { }

  ngOnInit() {
    this.loadActors();
    this.loadGenres();
  }

  private loadActors() : void{
    //port
    let url = "http://"+location.hostname;
    if(location.port !== ""){
      url += ":8090" + "";
    }

    this.http.get(url+"/api/actors").subscribe(
      (val) => {
        this.actorList = val;

      },
      response => {
        //setTimeout(() => this.populateWithNewData(), 1000);
      },
      () => {
        //The POST observable is now completed
      });
  }

  private loadGenres() : void{
    //port
    let url = "http://"+location.hostname;
    if(location.port !== ""){
      url += ":8090" + "";
    }

    this.http.get(url+"/api/genres").subscribe(
      (val) => {
        this.genresList = val;

      },
      response => {
        //setTimeout(() => this.populateWithNewData(), 1000);
      },
      () => {
        //The POST observable is now completed
      });
  }
  private getArray(process : any) : number[]{
    let result = [];
    for (let obj of process) {
      const work = <any> obj;
      if(work.checked){
        result.push(work.id);
      }
    }
    return result;
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
      "Actors" : this.getArray(this.actorList),
      "Genres" : this.getArray(this.genresList),
      "BgImage" : this.bgImage
    };

    console.log(this.actorList);
    console.log(this.genresList);

    console.log(JSON.stringify(data));
    this.state = "loading";
    this.http.post("/api/submit", JSON.stringify(data), httpOptions).subscribe(
      (val) => {
        this.state = "success";
        setTimeout(() => this.state = "input", 2000);
      },
      response => {
        this.state = "error";
        //POST call in error
      },
      () => {
        //The POST observable is now completed
        this.state = "success";
      });
  }

}
