import { TennisGame } from './TennisGame';
import { BooleanOperator } from "./service/BooleanOperator";
import { isFunction , isNull} from "util";
import { AdvantagesProvider } from "./provider/AdvantagesProvider";
import { DrawsProvider } from "./provider/DrawsProvider";
import { PointsProvider } from "./provider/PointsProvider";
import { Player } from "./model/Player";


export class TennisGame1 implements TennisGame {
  readonly player1: Player;
  readonly player2: Player;
  private score: string;
  private advantageProvider: AdvantagesProvider;
  private drawsProvider: DrawsProvider;
  private pointsProvider: PointsProvider;

  constructor(player1Name: string, player2Name: string) {
    this.score = '';
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.drawsProvider = new DrawsProvider();
    this.pointsProvider = new PointsProvider();
    this.advantageProvider = new AdvantagesProvider();
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1.name){
      this.player1.incrementPointScore();
    } else{
      this.player2.incrementPointScore();
    }
  }

  getScore(): string {

    if (this.scoreIsEqual()) {
      this.score = this.drawsProvider.getDrawTypeByScore(this.player1.getPointScore());
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

  private scoreIsEqual() {
    return this.player1.getPointScore() === this.player2.getPointScore();
  }

  checkWhoHasWonPoint() {

    this.calculatePlayerNewPoint(this.player1);
    this.calculatePlayerNewPoint(this.player2);

    this.score = this.player1.getPointType() + '-' + this.player2.getPointType();

  }

  private calculatePlayerNewPoint(player: Player) {
    if (this.pointsProvider.checkIfPointScoreExist(player.getPointScore())) {
      player.setPointType(this.pointsProvider.getPointTypeByScore(player.getPointScore()));
    }
  }

  checkAdvantages(scorePlayer1: number, scorePlayer2: number) {
    const booleanOperator = new BooleanOperator();
    const minusResult: number = scorePlayer1 - scorePlayer2;
    let checkResult = null;

    this.advantageProvider.getAdvantages().forEach(function (advantage) {

      if( isFunction(booleanOperator[advantage.function]) && isNull(checkResult) ) {
        checkResult = booleanOperator[advantage.function](minusResult, advantage.score, advantage.type);
      }
    }, checkResult);

    return !isNull(checkResult) ? checkResult : 'Win for player2';
  }
}
