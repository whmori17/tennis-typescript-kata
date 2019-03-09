import {Draw} from "../model/Draw";
import {PointsProvider} from "./PointsProvider";
import {isNull} from "util";

export class DrawsProvider extends PointsProvider{

    static points: Array<Draw> = [
        {score: 0, type: 'Love-All'},
        {score: 1, type: 'Fifteen-All'},
        {score: 2, type: 'Thirty-All'}
    ];

    static getDrawTypeByScore(score): string{

        const type = this.getPointTypeByScore(score);

        return !isNull(type) ? type : 'Deuce';
    }

}