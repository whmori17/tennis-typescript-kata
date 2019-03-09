import {Draw} from "../model/Draw";

export class DrawsProvider {
    private draws: Array<Draw> = [
        {score: 0, type: 'Love-All'},
        {score: 1, type: 'Fifteen-All'},
        {score: 2, type: 'Thirty-All'}
    ];

    getDraws() : Array<Draw> {
        return this.draws;
    }

    getDrawTypeByScore(score): string{

        for (let i = 0; i < (this.draws.length); i++) {
            if(score === this.draws[i].score){
                return this.draws[i].type;
            }
        }

        return 'Deuce';
    }

}