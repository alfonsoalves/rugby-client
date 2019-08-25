import { Score } from './model/Score';
import { CardType } from './model/card-type.enum';

export class Utilities {
  
  static TRY = 5;
  static PENALTY = 3;
  static CONVERSION = 2;
  static CONVERTED_TRY = 7;
  static PENALTY_TRY = 7;
  
  
  static parseScoreResponse(score) {
    let s = new Score();
    s.id = (<any>score)._id;
    s.time = (<any>score)._timestamp;
    s.playerId = (<any>score)._playerId;
    s.fixtureId = (<any>score)._fixtureId;
    s.scoreType = (<any>score)._scoreType;
    return s;
  }

  static getNameFromType(scoreType: number): string {
    switch (scoreType) {
      case 0:
        return 'Try'
      case 1:
        return 'Penalty'
      case 2:
        return 'Conversion'
    }
  }
  static getTypeFromName(scoreName: string): number {
    switch (scoreName) {
      case 'try':
        return 0
      case 'penalty':
        return 1
      case 'conversion':
        return 2
    }
  }

  static getScoreValueFromName(scoreName: string) {
    this.getScoreValueFromType(this.getTypeFromName(scoreName));
  }
  
  static getScoreValueFromType(scoreType: number): number {
    switch(scoreType) {
      case 0:
        return this.TRY;
      case 1:
        return this.PENALTY
      case 2:
        return this.CONVERSION;
      case 3:
        return this.CONVERTED_TRY;
      case 4:
        return this.PENALTY_TRY;
    }
  }

  static includeScoreType(scoreType:number): boolean {
    switch(scoreType) {
      case 0:
      case 3:
      case 4:
        return true;
      case 1:
        return true;
      case 2:
      case 3:
      case 4:
        return true;
    }
    
    return false;
  }

  static getCardTypeForCode(code: number):CardType {
    switch(code) {
      case 0:
        return CardType.YELLOW;
      case 1:
        return CardType.RED;
    }
  }
  
  static getCardTypeForValue(value: string):CardType {
    switch(value) {
      case "YELLOW":
        return CardType.YELLOW;
      case "RED":
          return CardType.RED;
    }
  }

}
