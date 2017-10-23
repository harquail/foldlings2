import { Edge } from "app/edge";

export class FoldFeature {
    public edges() {
        return [];
    }

    public folds() {
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
