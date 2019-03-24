import {Advantage} from "../model/Advantage";
import {PointsProvider} from "./PointsProvider";
import {isFunction, isNull} from "util";
import {BooleanOperator} from "../service/BooleanOperator";

export class AdvantagesProvider extends PointsProvider{

    static points: Array<Advantage> = [
        new Advantage(1, 'Advantage player1', 'equalTo'),
        new Advantage(-1, 'Advantage player2', 'equalTo'),
        new Advantage(2, 'Win for player1', 'greaterThanOrEqualTo'),
    ];

    static getAdvantageByScoreDifferenceBetweenPlayers(scoreDifferenceBetweenPlayers: number) {
        let checkAdvantage = null;
        const booleanOperator = new BooleanOperator();

        AdvantagesProvider.points.forEach(function (advantage: Advantage) {
            if (isFunction(booleanOperator[advantage.getCheckScoreFunction()]) && isNull(checkAdvantage)) {
                checkAdvantage = booleanOperator[advantage.getCheckScoreFunction()](scoreDifferenceBetweenPlayers, advantage.getScore(), advantage.getType());
            }
        }, checkAdvantage);

        return !isNull(checkAdvantage) ? checkAdvantage : 'Win for player2';
    }
}
