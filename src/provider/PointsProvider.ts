import {Point} from "../model/Point";


export class PointsProvider {

    static points: Array<Point> = [
        new Point(0, 'Love'),
        new Point(1, 'Fifteen'),
        new Point(2, 'Thirty'),
        new Point(3, 'Forty'),
    ];

    static checkIfPointScoreExist(score: number): boolean {

        for (let i = 0; i < (PointsProvider.points.length); i++) {
            if(score === PointsProvider.points[i].getScore()){
                return true;
            }
        }

        return false;
    }

    static getPointTypeByScore(score): string{

        for (let i = 0; i < (this.points.length); i++) {
            if(score === this.points[i].getScore()){
                return this.points[i].getType();
            }
        }

        return null;
    }
}
