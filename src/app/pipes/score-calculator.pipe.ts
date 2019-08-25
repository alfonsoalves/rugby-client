import { Pipe, PipeTransform } from '@angular/core';
import { Score } from '../model/Score';
import { Utilities } from '../utilities';

@Pipe({
  name: 'scoreCalculator'
})
export class ScoreCalculatorPipe implements PipeTransform {

  transform(scores: Score[], ...args: any[]): any {
    let score = 0;
    if (scores) {
      scores.filter(s => args[0] == 'home' ? s.playerId != undefined : s.playerId == undefined).forEach(s => score += Utilities.getScoreValueFromType(s.scoreType))
    }
    return score;
  }

}
