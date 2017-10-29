import { FoldFeature } from "app/fold-feature";
import { Edge, Point, EdgeKind } from "app/edge";
import { Plane, OrientationKind } from "app/plane";

export class Card extends FoldFeature {

    //                  h0
    //            S- - - - -
    //         s0 |         | e0
    //            |     h1  |
    //            - - -> - - 
    //         s1 |         | e1
    //            |     h2  | 
    //            - - - - - E
    //
    public centerFold: Edge;
    private h0: Edge;
    private e0: Edge;
    private h1: Edge;
    private s0: Edge;
    private e1: Edge;
    private s1: Edge;
    private h2: Edge;
    private cachedPlanes = [];

    constructor(width: number, height: number) {
        super();
        this.h1 = new Edge(new Point(0, height / 2), new Point(width, height / 2), this, EdgeKind.Fold);
        this.s0 = new Edge(new Point(0, 0), this.h1.start, this);
        this.e0 = new Edge(this.h1.end, new Point(width, 0), this);
        this.h0 = new Edge(this.e0.end, this.s0.start, this);
        this.e1 = new Edge(this.h1.end, new Point(width, height), this);
        this.h2 = new Edge(this.e1.end, new Point(0, height), this);
        this.s1 = new Edge(this.h2.end, this.h1.start, this);
        this.centerFold = this.h1;
        this.cachedPlanes.push(new Plane([this.s0, this.h1, this.e0, this.h0], OrientationKind.Vertical));
        this.cachedPlanes.push(new Plane([this.h1, this.e1, this.h2, this.s1], OrientationKind.Horizontal));
    }
    public edges() {
        return [this.s0, this.h1, this.e0, this.h0, this.e1, this.h2, this.s1];
    }

    public folds() {
        return [this.centerFold];
    }

    public planes() {
        return this.cachedPlanes;
    }

    public spansFold(e: Edge) {
        return false;
    }

}
