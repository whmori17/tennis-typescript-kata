export class Point {
    score: number;
    type: string;

    setPointScore(score: number) {
        this.score = score;
    }

    incrementPointScore() {
        return this.score +=1;
    }

    getPointScore() {
        return this.score;
    }

    setPointType(type: string) {
        this.type = type;
    }

    getPointType() {
        return this.type;
    }
}
