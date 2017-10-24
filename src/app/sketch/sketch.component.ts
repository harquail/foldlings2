import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FoldFeature } from 'app/fold-feature';
import { BoxFold } from 'app/box-fold';
import { Card } from 'app/card';
import { Plane } from 'app/plane';
import { Point } from 'app/edge';
import * as _ from 'lodash';
import { Sketch3d } from 'app/sketch/sketch3d';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.css']

})
export class SketchComponent implements OnInit {

  @ViewChild('container') elementRef: ElementRef;
  private container: HTMLElement;
  private sketch3d: Sketch3d;

  private currentFeature?: BoxFold;
  private previousFeatures: FoldFeature[] = [];

  constructor() {
    const card = new Card(600, 800);
    this.previousFeatures.push(card);
  }

  public features() {
    let features = this.previousFeatures;
    if (this.currentFeature) {
      features = features.concat(this.currentFeature);
    }
    return features;
  };

  handleMouseDown(e: MouseEvent) {
    const p = new Point(e.clientX, e.clientY);
    this.currentFeature = new BoxFold(p, p);
  }

  handleMouseUp(e: MouseEvent) {
    this.sketch3d.addFeature(this.currentFeature);
    this.previousFeatures.push(this.currentFeature);
    delete this.currentFeature;
  }

  handleMove(e: MouseEvent) {
    if (this.currentFeature) {
      const p = new Point(e.clientX, e.clientY);

      if (!this.currentFeature.drivingFold || !this.currentFeature.spansFold(this.currentFeature.drivingFold)) {
        delete this.currentFeature.drivingFold;
        // reversing previous features for now — will eventually split all the driving potential folds
        outer: for (const feature of this.previousFeatures) {
          for (const fold of feature.folds()) {
            if (this.currentFeature.spansFold(fold)) {
              feature.addChild(this.currentFeature);
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
    console.log(this.elementRef);
    this.container = this.elementRef.nativeElement;
    this.sketch3d = new Sketch3d(_.flatten(this.features()), this.container);
    this.sketch3d.init();
  }

}
