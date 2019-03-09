import {Point} from "../model/Point";


export class PointsProvider {

    static points: Array<Point> = [
        {score: 0, type: 'Love'},
        {score: 1, type: 'Fifteen'},
        {score: 2, type: 'Thirty'},
        {score: 3, type: 'Forty'},
    ];

    static checkIfPointScoreExist(score: number): boolean {

        for (let i = 0; i < (PointsProvider.points.length); i++) {
            if(score === PointsProvider.points[i].score){
                return true;
            }
        }

        return false;
    }

    static getPointTypeByScore(score): string{

        for (let i = 0; i < (this.points.length); i++) {
            if(score === this.points[i].score){
                return this.points[i].type;
            }
        }

        return null;
    }
}