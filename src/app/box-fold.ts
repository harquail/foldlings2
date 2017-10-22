import { FoldFeature, Edge, Point } from "app/fold-feature";


export class BoxFold extends FoldFeature {
    private start: Point;
    private end: Point;

    private drivingFold = new Edge(new Point(0, 400), new Point(1000, 400));

    public moveEnd(to: Point) {
        this.end = to;
    }

    public edges() {

        // make h0, h1, and h2 first.  Then s0, s1, s2, e0, e1, e2....
        //
        //                  h0
        //            S- - - - -
        //         s0 |         | e0
        //            |     h1  |
        //            - - - - - -
        //         s1 |         | e1
        //     _ _ _ _|         |_ _ _ _ _ driving
        //            |         |
        //         s2 |     h2  | e2
        //            - - - - - E
        //

        // #TODO
        
        // otherwise, we only have 4 edges
        //
        //               h0
        //            S------
        //         s0 |      | e0
        //            |      |
        //            -------E
        //               h2
        const s0 = new Edge(this.start, new Point(this.start.x, this.end.y));
        const h0 = new Edge(this.start, new Point(this.end.x, this.start.y));
        const h2 = new Edge(this.end, new Point(this.start.x, this.end.y));
        const e0 = new Edge(this.end, new Point(this.end.x, this.start.y));
        const bisect = new Edge(this.start, this.end);
        return [s0, h0, h2, e0, this.drivingFold];
    }

    constructor(start: Point, end: Point) {
        super();
        this.start = start;
        this.end = end;
    }
}
