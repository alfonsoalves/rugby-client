import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { FixtureService } from '../services/fixture.service';
import { Observable } from 'rxjs';
import { Fixture } from '../model/Fixture';

@Injectable()
export class FixtureResolver implements Resolve<Observable<Fixture[]>> {
  constructor(private fixtureService : FixtureService) {}

  resolve() {
    return this.fixtureService.findAll();
  }
}