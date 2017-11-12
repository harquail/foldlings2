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
  public static activeSketch: SketchComponent;

  private currentFeature?: BoxFold;
  private previousFeatures: FoldFeature[] = [];

  constructor() {
    const card = new Card(600, 800);
    this.previousFeatures.push(card);
    SketchComponent.activeSketch = this;
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
    console.log(this.featureAt(p));
    console.log(this.planeAt(p));
    this.currentFeature = new BoxFold(p, p);

  }


  public featureAt(p: Point): FoldFeature | null {
    return this.planeAt(p).feature || null;
  }

  public planeAt(p: Point): Plane | null {
    for (const plane of _.flatten(this.features().map((f) => f.planes()))) {
      if (plane.polygon.containsPoint(p)) {
        return plane;
      }
    }
    return null;
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
    this.reDrawSketch();
  }

  reDrawSketch() {
    this.container = this.elementRef.nativeElement;
    this.sketch3d = new Sketch3d(_.flatten(this.features()), this.container);
    this.sketch3d.init();
    for (const feature of this.features()) {
      this.sketch3d.addFeature(feature);
    }
  }

}
