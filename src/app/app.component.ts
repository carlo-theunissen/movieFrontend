import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http : HttpClient) { }

  private lastResponse : string = "";
  public items = [];
  public activeIndex : number = -1;
  public scroll : number = 0;
  public lastIndex : number = 1;


  private setItemsList(input : any){
    //[{"id":3,"Name":"Jean Peal","Description":"A teacher at the fontys","Duration":121.0,"actors":[],"genres":[{"id":1,"name":"Action","Movie":[]},{"id":2,"name":"Romance","Movie":[]}]}]
    this.items = [];
    for(let i =0; i < input.length; i++){
      //debugger;
      let tags = [input[i]['Duration'] + " minutes"];
      for(let x = 0; x < input[i].genres.length; x++){
        tags.push(input[i].genres[x].name);
      }

      let actors = [];
      for(let x = 0; x < input[i].actors.length; x++){
        console.log(input[i].actors[x]);
        actors.push({"name" : input[i].actors[x].name, "image" :  input[i].actors[x].BgImage});
      }
      let push = {
        'bgImage' : input[i]['BgImage'],
        "title" : input[i]['Name'],
        "tags" : tags,
        "description" : input[i]['Description'],
        "actors" : actors
      };
      this.items.push(push);
    }
  }
  public ngOnInit() {
      this.showNextAnimation();
  }
  private populateWithNewData(){

    //port
    let url = "http://"+location.hostname;
    if(location.port !== ""){
      url += ":8090" + "";
    }

    this.http.get(url+"/api/allMovies").subscribe(
      (val) => {
        const resoponse = JSON.stringify(val);
        if(this.lastResponse !== resoponse) {
          if(this.lastResponse.trim() !== ""){
            location.reload();
          }
          this.lastResponse = resoponse;
          this.setItemsList(val);
        }
      },
      response => {
        //setTimeout(() => this.populateWithNewData(), 1000);
      },
      () => {
        //The POST observable is now completed
      });
  }

  private showNextAnimation(){
    console.log("next");
    this.populateWithNewData();
    let next = this.activeIndex + 1;
    if(next >= this.items.length){
      next = 0;
    }
    this.lastIndex = this.activeIndex;
    this.activeIndex = -1;
    setTimeout( () => {
      this.scroll = -100 * next;

      setTimeout(() => {
        this.activeIndex = next;
        setTimeout( () => {
          this.showNextAnimation();
        }, 30 * 1000);
        this.lastIndex = -1;
      }, 2000);}, 1000);
  }
}
