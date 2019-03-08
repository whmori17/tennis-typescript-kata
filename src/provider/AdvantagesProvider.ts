import {Advantage} from "../model/Advantage";

export class AdvantagesProvider {

    private advantages: Array<Advantage> = [{
        value : 1,
        function: 'equalTo',
        return: 'Advantage player1'
    },{
        value : -1,
        function: 'equalTo',
        return : 'Advantage player2'
    },{
        value : 2,
        function: 'greaterThanOrEqualTo',
        return :  'Win for player1'
    }];

    getAdvantages(): Array<Advantage> {
        return this.advantages;
    }
}