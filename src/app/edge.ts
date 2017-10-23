export class Point {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export enum EdgeKind {
    Fold,
    Cut,
}
// really just a straight line right now.
// #TODO: maybe just use svgpathelements
export class Edge {
    public start: Point;
    public end: Point;
    public color: string;
    public kind: EdgeKind;
    constructor(start: Point, end: Point, kind: EdgeKind = EdgeKind.Cut) {
        this.start = start;
        this.end = end;
        this.kind = kind;
        this.color = this.edgeColor(this.kind);
    }

    // TODO move this to view layer
    private edgeColor(kind:EdgeKind): string{
        switch(kind){
            case EdgeKind.Cut:
            return `rgb(${this.randomBetween(50, 255)},${this.randomBetween(0, 0)},${this.randomBetween(0, 255)})`
            case EdgeKind.Fold:
            return `rgb(${this.randomBetween(0, 0)},${this.randomBetween(100, 255)},${this.randomBetween(0, 0)})`
        }
    }
   
    private randomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public reverse() {
        return new Edge(this.end, this.start);
    }
}