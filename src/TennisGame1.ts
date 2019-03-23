import { TennisGame } from './TennisGame';
import { AdvantagesProvider } from "./provider/AdvantagesProvider";
import { DrawsProvider } from "./provider/DrawsProvider";
import { PointsProvider } from "./provider/PointsProvider";
import { Player } from "./model/Player";

export class TennisGame1 implements TennisGame {
  readonly player1: Player;
  readonly player2: Player;
  readonly matchPointScore = 4;
  private score = '';

  constructor(player1Name: string, player2Name: string) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.name){
      this.player1.point.incrementPointScore();
    } else{
      this.player2.point.incrementPointScore();
    }
  }

  getScore(): string {

    if (this.playerScoresAreEqual()) {
      this.score = DrawsProvider.getDrawTypeByScore(this.player1.point.getPointScore());
    }else if (this.isMatchPoint()) {
      this.score = this.checkAdvantages();
    }else {
       this.checkWhoHasWonPoint();
    }

    return this.score;
  }

  private isMatchPoint() {
    return this.player1.point.getPointScore() >= this.matchPointScore || this.player2.point.getPointScore() >= this.matchPointScore;
  }

  private playerScoresAreEqual() {
    return this.player1.point.getPointScore() === this.player2.point.getPointScore();
  }

  checkWhoHasWonPoint() {

    this.calculatePlayerNewPoint(this.player1);
    this.calculatePlayerNewPoint(this.player2);

    this.score = this.player1.point.getPointType() + '-' + this.player2.point.getPointType();
  }

  private calculatePlayerNewPoint(player: Player) {
    if (PointsProvider.checkIfPointScoreExist(player.point.getPointScore())) {
      player.point.setPointType(PointsProvider.getPointTypeByScore(player.point.getPointScore()));
    }
  }

  checkAdvantages() {
    return AdvantagesProvider.getAdvantageByScoreDifferenceBetweenPlayers(
        this.player1.point.getPointScore() - this.player2.point.getPointScore()
    );
  }
}
