export class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

// really just a straight line right now.
// #TODO: maybe just use svgpathelements
export class Edge {
    public start: Point;
    public end: Point;
    public color:string;
    constructor(start: Point, end: Point) {
        this.start = start;
        this.end = end;
        this.color = `rgb(${this.randomBetween(50,255)},${this.randomBetween(50,255)},${this.randomBetween(50,255)})`;
    }

    private randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export class FoldFeature {
    public edges() {
        return [];
    }

    public outerPath?: SVGPathElement;
    // public drivingFold?: Line;
}
