import {Point} from "./Point";

export class Player {
    readonly name: string;
    point: Point;

    constructor(name: string) {
        this.name = name;
        this.point = new Point(0, '');
    }
}
