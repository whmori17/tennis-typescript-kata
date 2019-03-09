import {Advantage} from "../model/Advantage";
import {PointsProvider} from "./PointsProvider";

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
}