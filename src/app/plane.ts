import { Edge, Point, EdgeKind } from "app/edge";
import * as THREE from "three";
import * as _ from "lodash";

export enum OrientationKind {
    Vertical,
    Horizontal,
}

export class Plane {

    public orientation: OrientationKind;
    public points: Point[] = [];
    public color: THREE.Color;
    public pivotPoint: Point;
    public svgColor(): string {
        return `rgb(${this.color.r * 255},${this.color.g * 255},${this.color.b * 255})`
    }
    private randomColor(): THREE.Color {

        switch (this.orientation) {
            case OrientationKind.Horizontal:
                return new THREE.Color(this.randomBetween(20, 200) / 255, this.randomBetween(255, 255) / 255, this.randomBetween(255, 255) / 255);
            case OrientationKind.Vertical:
                return new THREE.Color(this.randomBetween(255, 255) / 255, this.randomBetween(20, 200) / 255, this.randomBetween(255, 255) / 255);
        }
    }
    private randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public svgPoints(): string {
        return this.points.map(function (p) {
            return `${p.x},${p.y}`;
        }).join(" ");
    }

    constructor(edges: Edge[], orientation) {
        for (let edge of edges) {
            this.points.push(edge.start);
        }
        this.pivotPoint = _.minBy(this.points,(p) => { return p.x + p.y });
        this.orientation = orientation;
        this.color = this.randomColor()
    }

}
