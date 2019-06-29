import { Pipe, PipeTransform } from '@angular/core';
import { Fixture } from '../model/fixture';

@Pipe({
  name: 'filterDivisions'
})
export class FilterDivisionsPipe implements PipeTransform {

  transform(fixtures: Fixture[], level: number): any {
    return fixtures.filter(function(fixture) {
      return fixture.level === level;
    })
  }

}
