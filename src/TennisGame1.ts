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
      this.player1.incrementPointScore();
    } else{
      this.player2.incrementPointScore();
    }
  }

  getScore(): string {

    if (this.playerScoresAreEqual()) {
      this.score = DrawsProvider.getDrawTypeByScore(this.player1.getPointScore());
    }else if (this.isMatchPoint()) {
      this.score = this.checkAdvantages();
    }else {
       this.checkWhoHasWonPoint();
    }

    return this.score;
  }

  private isMatchPoint() {
    return this.player1.getPointScore() >= this.matchPointScore || this.player2.getPointScore() >= this.matchPointScore;
  }

  private playerScoresAreEqual() {
    return this.player1.getPointScore() === this.player2.getPointScore();
  }

  checkWhoHasWonPoint() {

    this.calculatePlayerNewPoint(this.player1);
    this.calculatePlayerNewPoint(this.player2);

    this.score = this.player1.getPointType() + '-' + this.player2.getPointType();
  }

  private calculatePlayerNewPoint(player: Player) {
    if (PointsProvider.checkIfPointScoreExist(player.getPointScore())) {
      player.setPointType(PointsProvider.getPointTypeByScore(player.getPointScore()));
    }
  }

  checkAdvantages() {
    return AdvantagesProvider.getAdvantageByScoreDifferenceBetweenPlayers(
        this.player1.getPointScore() - this.player2.getPointScore()
    );
  }
}
