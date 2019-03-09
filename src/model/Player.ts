import {Point} from "./Point";

export class Player {
    name: string;
    point: Point;

    constructor(name: string, score: number = 0) {
        this.name = name;
        this.point = new Point();
        this.setPointScore(score);
        this.setPointType('');
    }

    setPointScore(score: number) {
        this.point.score = score;
    }

    incrementPointScore() {
        return this.point.score +=1;
    }

    getPointScore() {
        return this.point.score;
    }

    setPointType(type: string) {
        this.point.type = type;
    }

    getPointType() {
        return this.point.type;
    }
}