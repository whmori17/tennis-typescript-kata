export class Point {
    private score: number;
    private type: string;

    constructor(score: number, type: string) {
        this.score = score;
        this.type = type;
    }
    setScore(score: number): void {
        this.score = score;
    }

    incrementScore(): void {
        this.score +=1;
    }

    getScore(): number {
        return this.score;
    }

    setType(type: string): void {
        this.type = type;
    }

    getType(): string {
        return this.type;
    }
}
