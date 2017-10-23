import { Edge } from "app/edge";
import { Plane } from "app/plane";

export class FoldFeature {
    public edges() {
        return [];
    }

    public folds() {
        return [];
    }
    
    public planes(): Plane[] {
        return [];
    }
    
    public drivingFold?: Edge;

    public setDriver(fold: Edge){
        this.drivingFold = fold;
    }

    public spansFold(e: Edge) {
        return false;
    }


}
