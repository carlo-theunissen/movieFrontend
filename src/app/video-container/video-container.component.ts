import {Component, Input, OnInit} from '@angular/core';
import {state, style, trigger} from "@angular/animations";

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.css']

})
export class VideoContainerComponent implements OnInit {

  constructor() { }
  @Input() loading = false;
  @Input() displayAnimations = false;
  @Input() title : string;
  @Input() tags : string[];
  @Input() description : string;
  @Input() actors;
  @Input() bgImage : string;

  ngOnInit() {
  }

}
