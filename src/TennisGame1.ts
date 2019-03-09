import { TennisGame } from './TennisGame';
import { BooleanOperator } from "./service/BooleanOperator";
import { isFunction , isNull} from "util";
import { AdvantagesProvider } from "./provider/AdvantagesProvider";
import { DrawsProvider } from "./provider/DrawsProvider";
import { PointsProvider } from "./provider/PointsProvider";
import { Player } from "./model/Player";
import { Advantage } from "./model/Advantage";


export class TennisGame1 implements TennisGame {
  readonly player1: Player;
  readonly player2: Player;
  private score: string;

  constructor(player1Name: string, player2Name: string) {
    this.score = '';
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
      this.score = this.checkAdvantages(this.player1.getPointScore(), this.player2.getPointScore());
    }else {
       this.checkWhoHasWonPoint();
    }

    return this.score;
  }

  private isMatchPoint() {
    return this.player1.getPointScore() >= 4 || this.player2.getPointScore() >= 4;
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

  checkAdvantages(scorePlayer1: number, scorePlayer2: number) {
    let checkAdvantage = null;
    const booleanOperator = new BooleanOperator();
    const minusResult: number = scorePlayer1 - scorePlayer2;

    AdvantagesProvider.points.forEach(function (advantage: Advantage) {

      if( isFunction(booleanOperator[advantage.function]) && isNull(checkAdvantage) ) {
        checkAdvantage = booleanOperator[advantage.function](minusResult, advantage.score, advantage.type);
      }
    }, checkAdvantage);

    return !isNull(checkAdvantage) ? checkAdvantage : 'Win for player2';
  }
}
