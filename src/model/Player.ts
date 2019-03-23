import {Point} from "./Point";

export class Player {
    name: string;
    point: Point;

    constructor(name: string) {
        this.name = name;
        this.point = new Point();
        this.point.setPointScore(0);
        this.point.setPointType('');
    }
}
