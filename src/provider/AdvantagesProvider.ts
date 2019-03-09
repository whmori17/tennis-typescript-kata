import {Advantage} from "../model/Advantage";
import {PointsProvider} from "./PointsProvider";
import {isFunction, isNull} from "util";
import {BooleanOperator} from "../service/BooleanOperator";

export class AdvantagesProvider extends PointsProvider{

    static points: Array<Advantage> = [{
        score : 1,
        function: 'equalTo',
        type: 'Advantage player1'
    },{
        score : -1,
        function: 'equalTo',
        type : 'Advantage player2'
    },{
        score : 2,
        function: 'greaterThanOrEqualTo',
        type :  'Win for player1'
    }];

    static getAdvantageByScoreDifferenceBetweenPlayers(scoreDifferenceBetweenPlayers: number) {
        let checkAdvantage = null;
        const booleanOperator = new BooleanOperator();

        AdvantagesProvider.points.forEach(function (advantage: Advantage) {
            if (isFunction(booleanOperator[advantage.function]) && isNull(checkAdvantage)) {
                checkAdvantage = booleanOperator[advantage.function](scoreDifferenceBetweenPlayers, advantage.score, advantage.type);
            }
        }, checkAdvantage);

        return !isNull(checkAdvantage) ? checkAdvantage : 'Win for player2';
    }
}