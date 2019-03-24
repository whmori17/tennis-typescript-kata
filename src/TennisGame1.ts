import { TennisGame } from './TennisGame';
import { AdvantagesProvider } from "./provider/AdvantagesProvider";
import { DrawsProvider } from "./provider/DrawsProvider";
import { PointsProvider } from "./provider/PointsProvider";
import { Player } from "./model/Player";

export class TennisGame1 implements TennisGame {
  readonly player1: Player;
  readonly player2: Player;
  readonly matchPointScore = 4;

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.name){
      this.player1.point.incrementScore();
    } else{
      this.player2.point.incrementScore();
    }
  }

  getScore(): string {

    if (this.playerScoresAreEqual()) {
      return DrawsProvider.getDrawTypeByScore(this.player1.point.getScore());
    }else if (this.isMatchPoint()) {
      return this.checkAdvantages();
    }

    return this.checkWhoHasWonPoint();
  }

  private isMatchPoint(): boolean {
    return this.player1.point.getScore() >= this.matchPointScore || this.player2.point.getScore() >= this.matchPointScore;
  }

  private playerScoresAreEqual(): boolean {
    return this.player1.point.getScore() === this.player2.point.getScore();
  }

  checkWhoHasWonPoint(): string {

    this.calculatePlayerNewPoint(this.player1);
    this.calculatePlayerNewPoint(this.player2);

    return `${this.player1.point.getType()}-${this.player2.point.getType()}`;
  }

  private calculatePlayerNewPoint(player: Player): void {
    if (PointsProvider.checkIfPointScoreExist(player.point.getScore())) {
      player.point.setType(PointsProvider.getPointTypeByScore(player.point.getScore()));
    }
  }

  checkAdvantages(): string {
    return AdvantagesProvider.getAdvantageByScoreDifferenceBetweenPlayers(
        this.player1.point.getScore() - this.player2.point.getScore()
    );
  }
}
