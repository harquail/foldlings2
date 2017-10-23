import { Component, OnInit } from '@angular/core';
import { FoldFeature } from 'app/fold-feature';
import { BoxFold } from 'app/box-fold';
import { Card } from 'app/card';
import { Plane } from 'app/plane';
import { Point } from 'app/edge';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']

})
export class SketchComponent implements OnInit {
  private currentFeature?: BoxFold;
  private previousFeatures: FoldFeature[] = [];

  constructor() {
    const card = new Card(600, 800);
    this.previousFeatures.push(card);
  }

  public features() {
    let features = this.previousFeatures;
    if (this.currentFeature) {
      features = [...features, this.currentFeature];
    }
    return features;
  };

  public planes(): Plane[] {
    return [];
  };

  handleMouseDown(e: MouseEvent) {
    const p = new Point(e.clientX, e.clientY);
    this.currentFeature = new BoxFold(p, p);
  }

  handleMouseUp(e: MouseEvent) {
    this.previousFeatures.push(this.currentFeature);
    delete this.currentFeature;
  }

  handleMove(e: MouseEvent) {
    if (this.currentFeature) {
      const p = new Point(e.clientX, e.clientY);

      if (!this.currentFeature.drivingFold || !this.currentFeature.spansFold(this.currentFeature.drivingFold)) {
        delete this.currentFeature.drivingFold;
        // reversing previous features for now — will eventually split all the driving potential folds
        outer: for (const feature of this.previousFeatures.reverse()) {
            for (const fold of feature.folds()) {
            if (this.currentFeature.spansFold(fold)) {
              this.currentFeature.setDriver(fold);
              break outer;
            }
          }
        }
      }
      (this.currentFeature as BoxFold).moveEnd(p);
    }
  }

  ngOnInit() {
    console.error('meowr');
  }

}
