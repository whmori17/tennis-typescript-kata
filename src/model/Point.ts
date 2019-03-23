export class Point {
    score: number;
    type: string;

    setPointScore(score: number): void {
        this.score = score;
    }

    incrementPointScore(): void {
        this.score +=1;
    }

    getPointScore(): number {
        return this.score;
    }

    setPointType(type: string): void {
        this.type = type;
    }

    getPointType(): string {
        return this.type;
    }
}
