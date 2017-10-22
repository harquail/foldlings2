import { Component, OnInit } from '@angular/core';
import { FoldFeature, Point } from 'app/fold-feature';
import { BoxFold } from 'app/box-fold';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']

})
export class SketchComponent implements OnInit {
  private currentFeature?: BoxFold;
  public features() {
    if (this.currentFeature) {
      return [this.currentFeature]
    }
    return [];
  };
  constructor() { }

  handleMouseDown(e: MouseEvent) {
    const p = new Point(e.clientX, e.clientY);
    this.currentFeature = new BoxFold(p, p);
  }

  handleMove(e: MouseEvent) {
    const p = new Point(e.clientX, e.clientY);
    if(this.currentFeature){
      (this.currentFeature as BoxFold).moveEnd(p);
    }
  }
  ngOnInit() {
    console.error('meowr');
  }

}
