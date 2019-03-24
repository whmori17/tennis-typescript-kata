import {Point} from "./Point";

export class Advantage extends Point{
    private checkScoreFunction: string;

    constructor(score: number, type: string, check: string){
        super(score, type);

        this.checkScoreFunction = check;
    }

    getCheckScoreFunction(): string {
        return this.checkScoreFunction;
    }
}
