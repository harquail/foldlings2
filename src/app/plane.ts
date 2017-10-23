import { Edge, Point } from "app/edge";

export enum OrientationKind {
    Vertical,
    Horizontal,
}

export class Plane {
    public orientation: OrientationKind;
    public points: Point[] = [];
    public color: string;
    private randomColor() {
        switch (this.orientation) {
            case OrientationKind.Horizontal:
                return `rgb(${this.randomBetween(240, 250)},${this.randomBetween(255, 255)},${this.randomBetween(255, 255)})`
            case OrientationKind.Vertical:
                return `rgb(${this.randomBetween(255, 255)},${this.randomBetween(240, 250)},${this.randomBetween(255, 255)})`
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
        this.orientation = orientation;
        this.color = this.randomColor()
    }

}
