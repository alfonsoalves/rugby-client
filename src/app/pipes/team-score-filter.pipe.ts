import { Pipe, PipeTransform } from '@angular/core';
import { List } from 'immutable';
import { Score } from '../model/Score';

@Pipe({
  name: 'teamScoreFilter'
})
export class TeamScoreFilterPipe implements PipeTransform {

  transform(value: List<Score>, ...args: any[]): any {
    return value.filter(s => s.playerId == null && args[0] == 1)
  }

}
