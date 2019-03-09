import {Advantage} from "../model/Advantage";

export class AdvantagesProvider {

    private advantages: Array<Advantage> = [{
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

    getAdvantages(): Array<Advantage> {
        return this.advantages;
    }
}