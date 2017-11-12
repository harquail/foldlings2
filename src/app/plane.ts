import { Edge, Point, EdgeKind } from "app/edge";
import * as THREE from "three";
import * as _ from "lodash";
import * as Polygon from "polygon";
import * as PolyBool from "polybooljs";

export enum OrientationKind {
    Vertical,
    Horizontal,
}

// type Polygon = any;

export class Plane {

    public orientation: OrientationKind;
    public polygon: Polygon;

    get points() {
        return this.polygon.points;
    }

    public color: THREE.Color;
    public pivotPoint: Point;
    public parent?: Plane;

    public svgColor(): string {
        return `rgb(${this.color.r * 255},${this.color.g * 255},${this.color.b * 255})`
    }
    private randomColor(): THREE.Color {
        let numParents = 0.2;
        let parent: Plane = this;
        while (parent = parent.parent) {
            numParents += .2;
        }
        switch (this.orientation) {
            case OrientationKind.Horizontal:
                return new THREE.Color(this.randomBetween(20, 20) / 255, this.randomBetween(255 * numParents, 255 * numParents) / 255, this.randomBetween(255 * numParents, 255 * numParents) / 255);
            case OrientationKind.Vertical:
                return new THREE.Color(this.randomBetween(255 * numParents, 255 * numParents) / 255, this.randomBetween(0, 0) / 255, this.randomBetween(255 * numParents, 255 * numParents) / 255);
        }
    }
    private randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public svgPoints(): string {

        return this.polygon.points.map(function (p) {
            return `${p.x},${p.y}`;
        }).join(" ");
    }

    public equals(plane: Plane): boolean {
        return this.polygon.equal(plane.polygon);
    }

    public cutBy(p: Plane): Plane {
        const cuts = PolyBool.difference({
            regions: [p.polygon.toArray()],
            inverted: false
        }, {
                regions: [this.polygon.toArray()],
                inverted: false
            });

        if (cuts.regions[0]) {
            // console.log('cut a bitch', cuts);
            const cutPoly = new Polygon(cuts.regions[0]);
            // console.log(cutPoly)
            p.polygon = cutPoly
            const newPlane = new Plane([], this.orientation, this.parent);
            newPlane.polygon = cutPoly;
            // return newPlane;
        }
        return this;
    }

    constructor(edges: Edge[], orientation, parent?: Plane) {
        this.polygon = new Polygon(edges.map((e) => e.start));
        // console.log(this.polygon);

        this.pivotPoint = _.minBy(this.polygon.points, (p) => { return p.x + p.y });
        this.orientation = orientation;
        this.parent = parent;
        this.color = this.randomColor();
    }


}
