import { TennisGame } from './TennisGame';
import {BooleanOperator} from "./service/BooleanOperator";
import {isFunction, isNull} from "util";
import {AdvantagesProvider} from "./provider/AdvantagesProvider";
import {DrawsProvider} from "./provider/DrawsProvider";


export class TennisGame1 implements TennisGame {
  private m_score1: number = 0;
  private m_score2: number = 0;
  private player1Name: string;
  private player2Name: string;
  private score: string;
  private checkResult;
  private advantageProvider: AdvantagesProvider;
  private drawsProvider: DrawsProvider;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.score = '';
    this.checkResult = null;
    this.advantageProvider = new AdvantagesProvider();
    this.drawsProvider = new DrawsProvider();
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name)
      this.m_score1 += 1;
    else
      this.m_score2 += 1;
  }

  getScore(): string {

    if (this.scoreIsEqual()) {
      this.score = this.checkDraw(this.m_score1);
    }else if (this.isMatchPoint()) {
      this.score = this.checkAdvantages(this.m_score1, this.m_score2);
    }else {
       this.checkWhoHasWonPoint();
    }

    return this.score;
  }

  private isMatchPoint() {
    return this.m_score1 >= 4 || this.m_score2 >= 4;
  }

  private scoreIsEqual() {
    return this.m_score1 === this.m_score2;
  }

  checkWhoHasWonPoint() {

    let tempScore;

    for (let i = 1; i < 3; i++) {

      if (i === 1) {
        tempScore = this.m_score1;
      }
      else {
        this.score += '-';
        tempScore = this.m_score2;
      }

      switch (tempScore) {
        case 0:
          this.score += 'Love';
          break;
        case 1:
          this.score += 'Fifteen';
          break;
        case 2:
          this.score += 'Thirty';
          break;
        case 3:
          this.score += 'Forty';
          break;
      }
    }

  }

  checkAdvantages(scorePlayer1: number, scorePlayer2: number) {
    const booleanOperator = new BooleanOperator();
    const minusResult: number = scorePlayer1 - scorePlayer2;

    this.advantageProvider.getAdvantages().forEach(function (advantage) {

      if( isFunction(booleanOperator[advantage.function]) && isNull(this.checkResult) ) {
        this.checkResult = booleanOperator[advantage.function](minusResult, advantage.value, advantage.return);
      }
    }, this);

    return !isNull(this.checkResult) ? this.checkResult : 'Win for player2';
  }

  checkDraw (scorePlayer1) : string {

    if (this.drawsProvider.checkIfDrawScoreExist(scorePlayer1)) {
      return this.drawsProvider.getDrawTypeByScore(scorePlayer1);
    }

    return 'Deuce';
  }
}
