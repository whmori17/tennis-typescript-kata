import {Point} from "../model/Point";


export class PointsProvider {

    protected points: Array<Point> = [
        {score: 0, type: 'Love'},
        {score: 1, type: 'Fifteen'},
        {score: 2, type: 'Thirty'},
        {score: 3, type: 'Forty'},
    ];

    getPoints(): Array<Point> {
        return this.points;
    }

    checkIfPointScoreExist(score: number): boolean {

        for (let i = 0; i < (this.points.length); i++) {
            if(score === this.points[i].score){
                return true;
            }
        }

        return false;
    }

    getPointTypeByScore(score): string{

        for (let i = 0; i < (this.points.length); i++) {
            if(score === this.points[i].score){
                return this.points[i].type;
            }
        }

        return null;
    }
}