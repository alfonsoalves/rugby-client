import { Pipe, PipeTransform } from '@angular/core';
import { Score } from '../model/Score';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from 'immutable';

@Pipe({
  name: 'mapScore'
})
export class MapScorePipe implements PipeTransform {

  transform(value: List<Score>, ...args: any[]): any {
    return value ? value.filter(score => score.scoreType == args[0]).size : 0;
  }

}
