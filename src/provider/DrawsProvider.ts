import {Draw} from "../model/Draw";
import {PointsProvider} from "./PointsProvider";
import {isNull} from "util";

export class DrawsProvider extends PointsProvider{

    static points: Array<Draw> = [
        new Draw(0, 'Love-All'),
        new Draw(1, 'Fifteen-All'),
        new Draw(2, 'Thirty-All'),
    ];

    static getDrawTypeByScore(score): string{

        const type = this.getPointTypeByScore(score);

        return !isNull(type) ? type : 'Deuce';
    }

}
