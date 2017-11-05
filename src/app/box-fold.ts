import { FoldFeature } from "app/fold-feature";
import { Point, Edge, EdgeKind } from "app/edge";
import { Plane, OrientationKind } from "app/plane";


export class BoxFold extends FoldFeature {
    private start: Point;
    private end: Point;
    private cachedEdges?: Edge[];
    private cachedPlanes?: Plane[];
    public moveEnd(to: Point) {
        if (to != this.end) {
            this.end = to;
            delete this.cachedEdges;
        }
    }

    public edges(): Edge[] {
        // make h0, and h2 first because they always exist.
        let es = [];
        if (this.cachedEdges) {
            return this.cachedEdges
        }

        this.cachedPlanes = [];
        const h0 = new Edge(this.start, new Point(this.end.x, this.start.y), this, EdgeKind.Fold);
        const h2 = new Edge(this.end, new Point(this.start.x, this.end.y), this, EdgeKind.Fold);

        //
        //                  h0
        //            S- - - - -
        //         s0 |         | e0
        //            |     h1  |
        //            - - -< - - 
        //         s1 |         | e1
        //     _ _ _ _|         |_ _ _ _ _ driving
        //            |         |
        //            |     h2  | 
        //            - - - - - E
        //

        // if box spans driving fold
        if (this.drivingFold) {
            const drivingY = this.drivingFold.start.y;
            // h1 is translated by 
            const offsetY = drivingY - this.start.y;
            const h1 = new Edge(new Point(this.end.x, this.end.y - offsetY), new Point(this.start.x, this.end.y - offsetY), this, EdgeKind.Fold);
            const e0 = new Edge(h0.end, h1.start, this);
            const s0 = new Edge(h1.end, this.start, this);
            const e1 = new Edge(h1.start, this.end, this);
            const s1 = new Edge(h2.end, h1.end, this);
            es.push(h0, e0, h1, s0, e1, h2, s1);
            // console.log(this.drivingFold.feature.planes());
            const topPlane = new Plane([h0, e0, h1, s0], OrientationKind.Horizontal, this.drivingFold.feature.topPlane());
            this.cachedPlanes.push(topPlane);
            this.cachedPlanes.push((new Plane([e1, h2, s1, h1.reverse()], OrientationKind.Vertical, topPlane)));
        }
        else {
            // otherwise, we only have 4 edges
            //
            //               h0
            //            S------
            //         s0 |      | e0
            //            |      |
            //            -------E
            //               h2
            const s0 = new Edge(h2.end, this.start, this);
            const e0 = new Edge(h0.end, this.end, this);
            h0.kind = EdgeKind.Cut;
            h2.kind = EdgeKind.Cut;
            es.push(h0, e0, h2, s0);
            this.cachedPlanes.push(new Plane(es, OrientationKind.Vertical));
        }

        this.cachedEdges = es;
        return es;
    }

    public planes(): Plane[] {
        // calculate cached edges, which calculates planes as a side effect
        this.edges();
        return this.cachedPlanes;
    }

    public spansFold(e: Edge): boolean {
        const minY = Math.min(this.start.y, this.end.y);
        const maxY = Math.max(this.start.y, this.end.y);
        const drivingY = e.start.y;

        const minX = Math.min(this.start.x, this.end.x);
        const maxX = Math.max(this.start.x, this.end.x);
        const minDrivingX = Math.min(e.start.x, e.end.x);
        const maxDrivingX = Math.max(e.start.x, e.end.x);
        return minY < drivingY && maxY > drivingY && minDrivingX < minX && maxDrivingX > maxX;
    }

    public folds(): Edge[] {
        return this.edges().filter((e) => { return e.kind == EdgeKind.Fold });
    }

    constructor(start: Point, end: Point) {
        super();
        this.start = start;
        this.end = end;
    }
}
